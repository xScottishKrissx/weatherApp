import React from 'react'
import { Text, FlatList } from 'react-native';
import ForecastRow from './forecastRow';

export default function Forecast({apiData}) {

    const renderItem = ({item, index}) => (
        <ForecastRow item={item} index={index} />
    )

    return (
        <>
            <Text style={{fontSize:20}}>Forecast</Text>
            <FlatList
                style={{flex:1, width:"100%"}}
                data={apiData.list}
                renderItem={renderItem}
            />            
        </>
    )
}