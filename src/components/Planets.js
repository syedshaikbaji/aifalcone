import React from "react";

class Planets extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { planetsfromapi, selectPlanetsFn, timeTaken } = this.props;
        const printPlanets = planetsfromapi.map((planet) => {
            return (<div key={planet.name} className="col-lg-2 p-0 column1 d-flex align-items-center justify-content-center">
                <div className="planet col-lg-12 p-0 text-center" onClick={(event) => selectPlanetsFn(planet, event)}>
                    <figure className="p-0 m-0">
                        <img className="mb-2" src={require(`../assets/images/${planet.name.toLowerCase()}.png`)} alt="space pod" />
                        <figcaption className="text-white">
                            <p className="m-0 px-3 py-2">
                                <span className="d-block mb-2 font-18 text-uppercase OpenSans-Bold">{planet.name}</span>
                                <span className="pspecs d-block"><strong>Distance: </strong> {planet.distance} megamiles</span>
                            </p>
                        </figcaption>
                    </figure>
                    {/* <img src={require('../assets/images/donlon.png')} alt="space pod" /> */}
                </div>
            </div>)
        })
        return (<>
            <section className="planet-section six-col-section">
                <div className="col-12 p-0 timeTaken-block">
                    <h4 className="">Time taken: {timeTaken}</h4>
                </div>
                <div className="container-fluid p-0">
                    <h1 className="text-center OpenSans-Bold"><span className="font-18 OpenSans-Light d-block">Potential</span> Hideouts</h1>
                    <div className="row">
                        <article className="col-lg-12 p-0 inrow-1 col-wrapper d-flex flex-row flex-wrap justify-content-between">
                            {printPlanets}
                        </article>
                    </div>
                </div>
            </section>
        </>)
    }
}
export default Planets;