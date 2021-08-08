const RegionMenu = ({place}) => {

    const nestedRegions = (place && place.children || []).map(place => {
        return <RegionMenu key={place.id} place={place} type={"child"}/>
    })

    return (
        <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
            <div key={place && place.id}>{place && place.name}</div>
            {nestedRegions}
        </div>
    )
}

export default RegionMenu;