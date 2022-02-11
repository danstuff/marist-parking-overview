import React, { useState } from 'react';

import { Image } from 'react-native';

import { 
    Box,
    Button,
    Collapsible,
    Grommet,
    Layer,
    ResponsiveContext,
    Text,
} from 'grommet';

import { 
    Menu as MenuIcon,
} from 'grommet-icons';

import { 
    CloseBar,
    OptionViewer,
    FilterViewer,
    MapViewer,
    LoginViewer,
} from './Options.js';

import { LotTable } from './Lot.js';

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
                source={require('./assets/images/marSeal.png')}
                style={{ width: 64, height: 64 }}/>
            <Text size='large'>{props.title}</Text>
        </Box>
        <Button icon={<MenuIcon/>} onClick={props.show}/>
    </Box>
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
                        <LotTable
                            data={SAMPLE_DATA}/>
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
                            <OptionViewer
                                marMap={toggleMap}
                                marFilter={toggleFilter}
                                marLogin={toggleLogin}/>
                        </Box>
                    </Collapsible>
                    ) : (
                    <Layer>
                        <CloseBar marAction={toggleMenu}/>
                        <Options
                            marMap={toggleMap}
                            marFilter={toggleFilter}/>
                    </Layer>
                    )}

                    {showMap && (
                    <Layer>
                        <CloseBar header='Lot Map' 
                            marAction={toggleMap}/>

                        <MapViewer/>
                    </Layer>
                    )}

                    {showFilter && (
                    <Layer>
                        <CloseBar header="Filter By..."
                            marAction={toggleFilter}/>
                        
                        <FilterViewer
                            types={REG_TYPES}
                            lots={SAMPLE_DATA} />
                    </Layer>
                    )}

                    {showLogin && (
                    <Layer>
                        <CloseBar header="Log In"
                            marAction={toggleLogin}/>

                        <LoginViewer/>
                    </Layer>
                    )}
                </Box>
            </Box>
            )}
        </AppBody>
    );
};

export default marApp;
