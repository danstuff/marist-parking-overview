import React from 'react';

import { ScrollView } from 'react-native';

import { 
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Text,
    Meter,
    Stack,
} from 'grommet';

const ro = Math.round;

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

const LotTable = (props) => (
    <ScrollView>
    <Table
        background={{
            body: [ 'white', 'light-1' ]
        }}>
        <TableBody>
            {props.data.map(datum => (
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

export { LotTable };
