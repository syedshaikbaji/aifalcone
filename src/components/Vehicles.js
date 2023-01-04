import React, { Children } from "react";


class Vehicles extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const { vehiclesfromapi, selectVehicleFn } = this.props;
        const printVehicles = vehiclesfromapi.map((vehicle, index) => {
            return (<div key={index} className="col-lg-3 p-0 column1 d-flex align-items-center justify-content-center">
                <div className="vehicle col-lg-12 p-0 text-center" title="Space Pod" onClick={(event) => selectVehicleFn(vehicle, event)}>
                    <figure className="p-0 m-0">
                        <img src={require(`../assets/images/${vehicle.name.toLowerCase().split(' ').join('-')}.png`)} alt="space pod" />
                        <figcaption>
                            <p className="m-0 px-3 py-2">
                                <span className="d-block mb-2 font-16 text-uppercase OpenSans-Bold">{vehicle.name} ({vehicle.total_no})</span>
                                <span className="vspecs d-block mb-2"><strong>Speed: </strong> {vehicle.speed} megamiles/hour</span>
                                <span className="vspecs d-block"><strong>Max Distance: </strong> {vehicle['max_distance']} megamiles</span>
                            </p>
                        </figcaption>
                    </figure>
                </div>
            </div>)
        })
        return (<>
            <section className="vehicle-section fou-col-section col-12 p-0 pt-3 pb-5">
                <div className="container-fluid p-0 vehicle-container mb-5">
                    <h1 className="text-center OpenSans-Bold m-0"><span className="font-18 OpenSans-Light d-block">Available</span> Vehicles</h1>
                    <div className="row">
                        <article className="col-lg-12 p-0 inrow-1 col-wrapper d-flex flex-row flex-wrap justify-content-between">
                            {printVehicles}
                        </article>
                    </div>
                </div>
            </section>
        </>)
    }
}
export default Vehicles;