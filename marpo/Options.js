import React from 'react';

import { Image, Dimensions } from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';

import { 
    Box,
    Button,
    Menu,
    Text,
} from 'grommet';

import { 
    Close,
    MapLocation,
    Search,
    Login,
} from 'grommet-icons';

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

const OptionButton = (props) => (
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

const OptionViewer = (props) => (
    <Box fill justify='start'>
        <Box 
            direction='column'
            gap='none'
            fill='horizontal'>

            <OptionButton click={props.marMap}>
                <p><MapLocation size='large'/></p>
                <p>View Map</p>
            </OptionButton>
            <OptionButton click={props.marFilter}>
                <p><Search size='large'/></p>
                <p>Filter Lots</p>
            </OptionButton>
            <OptionButton click={props.marLogin}>
                <p><Login size='large'/></p>
                <p>Log In</p>
            </OptionButton>
        </Box>
    </Box>
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

const FilterViewer = (props) => (
    <Box pad='large' justify='center'> 
        <FilterMenu label='Registration Type'
            array={props.types}/>
        <FilterMenu label='Favorite Lot'
            array={props.lots}/>
    </Box>
);

const MapViewer = () => (
    <ImageZoom 
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height - 64}
        imageWidth={1495}
        imageHeight={1147}
        enableCenterFocus={false}>
        <Image 
            source={require('./assets/images/marMap.png')}
            style={{ width:1495, height:1147 }}/>
    </ImageZoom>
);

const LoginViewer = () => (
    <iframe src="https://my.marist.edu/"
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height-64}>
    </iframe>
);

export { 
    CloseBar,
    OptionViewer,
    FilterViewer,
    MapViewer,
    LoginViewer,
};
