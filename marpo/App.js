import React, { useState } from 'react';

import {
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';
import { WebView } from 'react-native-webview';

import { 
    Box,
    Button,
    Collapsible,
    Menu,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Text,
    Heading,
    Grommet,
    Layer,
    Meter,
    ResponsiveContext,
    Stack,
} from 'grommet';

import { 
    Close,
    MapLocation,
    Search,
    Login,
    Menu as MenuIcon,
} from 'grommet-icons';

const ro = Math.round;
const ra = Math.random;

const SAMPLE_DATA = [
    { id: 1, name: "McCann/Sheahan",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 2, name: "Foy",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 3, name: "Dyson",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 4, name: "Donnelly",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 5, name: "Fontaine",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 6, name: "Hoop",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 7, name: "St. Ann’s/North End",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 8, name: "Beck West",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 9, name: "Beck East",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 10, name: "Midrise",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 11, name: "Steel Plant",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 12, name: "Riverview",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 13, name: "Allied Health & Science",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 14, name: "Lower West Cedar",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 15, name: "69 West Cedar",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 16, name: "Fulton/Tennis Court",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 17, name: "51/57 Fulton",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
    { id: 18, name: "Upper West Cedar",
        spotsOpen: ro(ra() * 100), spotsTotal: 100, types: [1, 2],
        updateTime: "00:00 AM" },
];

const REG_TYPES = [
    { id: 1, name: 'Resident Student' },
    { id: 2, name: 'Commuter Student' },
    { id: 3, name: 'Faculty / Staff' },
    { id: 4, name: 'Visitor' },
];

const marTheme = {
    global: {
        colors: {
            base: "#FFFFFF",
            text: "#1A0000",
            brand: "#800000",

        },
        font: {
            family: 'sans-serif',
            size: '18px',
            height: '20px',
        },
    },
};

const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='base'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='small'
        style={{ zIndex: '10' }}> 
        <Box 
            gap='medium'
            direction='row'
            align='center'
            justify='center'>

            <Image 
                source={require('./assets/marSeal.png')}
                style={{ width: 64, height: 64 }}/>
            <Text size='large'>{props.title}</Text>
        </Box>
        <Button icon={<MenuIcon/>} onClick={props.show}/>
    </Box>
);


const MenuButton = (props) => (
    <Button fill='horizontal' onClick={props.click}>
        <Box
            pad={{ horizontal: 'large', vertical: 'small' }}
            direction='row'
            align='center'
            justify='evenly'
            elevation='small'
            {...props}
        />
    </Button>
);

const MenuItems = (props) => (
    <Box 
        direction='column'
        gap='none'
        fill='horizontal'>

        <MenuButton click={props.marMap}>
            <p><MapLocation size='large'/></p>
            <p>View Map</p>
        </MenuButton>
        <MenuButton click={props.marFilter}>
            <p><Search size='large'/></p>
            <p>Filter Lots</p>
        </MenuButton>
        <MenuButton click={props.marLogin}>
            <p><Login size='large'/></p>
            <p>Log In</p>
        </MenuButton>
    </Box>
);

const CloseBar = (props) => (
    <Box
        background='base'
        tag='header'
        justify='between'
        align='center'
        direction='row'
        pad='small'
        elevation='small'>
        <Text size='large'>{props.header}</Text>
        <Button icon={<Close/>} onClick={props.marAction}/>
    </Box>
);

const LotMeter = (props) => (
    <Box align='end'>
        <Stack
            anchor='center'>
            <Meter
                type='pie'
                values={[
                    { value: props.spotsOpen, color: 'green' },
                    { value: 
                        props.spotsTotal - props.spotsOpen,
                      color: 'red' },
                ]}
                size='xsmall'
            />
            <Text size='xlarge' color='white'>{props.spotsOpen}</Text>
        </Stack>
    </Box>
);

const LotTable = () => (
    <ScrollView>
    <Table
        background={{
            body: [ 'white', 'light-1' ]
        }}>
        <TableBody>
            {SAMPLE_DATA.map(datum => (
            <TableRow key={datum.id}> 
            <TableCell
                key={0}
                background={datum.id % 2 == 1 ? 'white' : 'light-3'}>
                <Box direction='row' justify='between'
                    pad={{ horizontal: 'large', vertical: 'small' }}> 
                    <Box direction='column' justify='center'> 
                        <Text size='large'><b>
                            {datum.id}. {datum.name}
                        </b></Text>
                        <Text>
                            {datum.spotsOpen} of {datum.spotsTotal} Spots Open - {ro(datum.spotsOpen / datum.spotsTotal * 100)}%
                        </Text>
                        <Text><i>
                            Last updated at {datum.updateTime}
                        </i></Text>
                    </Box>
                    <LotMeter
                        spotsOpen={datum.spotsOpen}
                        spotsTotal={datum.spotsTotal}
                    />
                </Box>
            </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
    </ScrollView>
);

const FilterMenu = (props) => (
    <Menu label={props.label}
        items={
            props.array.map(datum => (
                { 
                    label: datum.name,
                    onClick: () => {},
                }
            ))
        }
    />
);

const AppBody = (props) => (
    <Grommet theme={marTheme} full>
        <ResponsiveContext.Consumer
            {...props}
        />
    </Grommet>
);

const marApp = () => {
    const [ showMenu, setShowMenu ] = useState(false);
    const [ showMap, setShowMap ] = useState(false);
    const [ showFilter, setShowFilter ] = useState(false);
    const [ showLogin, setShowLogin ] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);
    const toggleMap = () => setShowMap(!showMap);
    const toggleFilter = () => setShowFilter(!showFilter);
    const toggleLogin = () => setShowLogin(!showLogin);

    return (
        <AppBody>
            {size => (
            <Box fill>
                <AppBar 
                    title='Parking Lots'
                    show={toggleMenu}/>
                <Box 
                    direction='row'
                    flex overflow={{ horizontal: 'hidden' }}>

                    <Box fill>
                        <LotTable/>
                    </Box>

                    {(!showMenu || size !== 'small') ? (
                    <Collapsible
                        direction='horizontal'
                        open={showMenu}>
                        <Box
                            flex
                            width='medium'
                            style={{ zIndex: '9' }}
                            justify='start'>
                            <MenuItems
                                marMap={toggleMap}
                                marFilter={toggleFilter}
                                marLogin={toggleLogin}/>
                        </Box>
                    </Collapsible>
                    ) : (
                    <Layer>
                        <CloseBar marAction={toggleMenu}/>
                        <Box
                            fill
                            justify='start'>
                            <MenuItems
                                marMap={toggleMap}
                                marFilter={toggleFilter}/>
                        </Box>
                    </Layer>
                    )}

                    {showMap && (
                    <Layer>
                        <CloseBar header='Lot Map' 
                            marAction={toggleMap}/>

                        <ImageZoom 
                            cropWidth={Dimensions.get('window').width}
                            cropHeight={Dimensions.get('window').height - 64}
                            imageWidth={1495}
                            imageHeight={1147}
                            enableCenterFocus={false}>
                            <Image 
                                source={require('./assets/marMap.png')}
                                style={{ width:1495, height:1147 }}/>
                        </ImageZoom>
                    </Layer>
                    )}

                    {showFilter && (
                    <Layer>
                        <CloseBar header="Filter By..."
                            marAction={toggleFilter}/>
                        
                        <Box pad='large' justify='center'> 
                            <FilterMenu label='Registration Type'
                                array={REG_TYPES}/>
                            <FilterMenu label='Favorite Lot'
                                array={SAMPLE_DATA}/>
                        </Box>
                    </Layer>
                    )}

                    {showLogin && (
                    <Layer>
                        <CloseBar header="Log In"
                            marAction={toggleLogin}/>
                        <iframe src="https://my.marist.edu/"
                            width={Dimensions.get('window').width}
                            height={Dimensions.get('window').height-64}>
                        </iframe>
                    </Layer>
                    )}
                </Box>
            </Box>
            )}
        </AppBody>
    );
};

export default marApp;
