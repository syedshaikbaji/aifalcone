import React from "react";
import '../assets/css/custom-styles.css';
import '../assets/css/main.css';
import Planets from "./Planets";
import Vehicles from "./Vehicles";
import Modal from "./Modal";

class Appwrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehiclesfromapi: [],
            planetsfromapi: [],
            selectedVehiclesArray: [],
            selectedPlanetsArray: [],
            isModalOpen: false,
            selectPair: false,
            modalData: {
                condmsg: false,
                warnmsg: false,
                cantgomsg: false,
                vehicleToPlanet: { 'selectedVehiclesArray': [], 'selectedPlanetsArray': [] }
            },
            beginBool: true,
            timeTaken: 0
        }
    }
    selectVehicleFn = (selected, event) => {
        let vindex;
        if (this.state.selectPair === false && this.state.selectedPlanetsArray.length < 4) {
            if (selected.total_no >= 1) {
                vindex = this.state.vehiclesfromapi.findIndex((v) => v.name === selected.name);
            }
            const newVehicles = [...this.state.vehiclesfromapi];
            newVehicles[vindex]['total_no'] = selected.total_no - 1;
            this.setState({
                selectedVehiclesArray: [...this.state.selectedVehiclesArray, selected.name],
                vehiclesfromapi: [...newVehicles],
                selectPair: true,
                beginBool: false
            }, () => {
                selected.total_no === 0 && event.target.classList.add('selected');
                this.modalOpen(null);
            })
        } else {
            if (this.state.selectedPlanetsArray.length >= 4) {
                this.modalOpen('warning');
            } else {
                this.modalOpen('condition');
            }
        }
    }
    selectPlanetsFn = (selected, event) => {
        const svehicle = this.state.vehiclesfromapi.filter((veh) => veh.name === this.state.selectedVehiclesArray[this.state.selectedVehiclesArray.length - 1]);
        if (this.state.beginBool) {
            this.modalOpen('begin');
            this.setState({ beginBool: false })
        } else if (this.state.selectPair === true && this.state.selectedPlanetsArray.length < 4) {
            if (svehicle[0]["max_distance"] >= selected.distance) {
                this.setState({
                    selectedPlanetsArray: [...this.state.selectedPlanetsArray, selected.name],
                    selectPair: false,
                    timeTaken: this.state.timeTaken + (selected.distance / svehicle[0].speed)
                }, () => {
                    event.target.classList.add('selected');
                    this.modalOpen();
                });
            } else {
                this.modalOpen('cantgo');
            }

        } else {
            if (this.state.selectedPlanetsArray.length >= 4) {
                this.modalOpen('warning');
            } else {
                this.modalOpen('condition');
            }
        }
    }
    modalOpen = (option) => {
        if (option === 'begin') {
            this.setState({
                isModalOpen: true,
                modalData: {
                    ...this.state.modalData,
                    beginmsg: true
                }
            });
        } else if (option === 'cantgo') {
            this.setState({
                isModalOpen: true,
                modalData: {
                    ...this.state.modalData,
                    cantgomsg: true
                }
            });
        } else if (option === 'condition') {
            this.setState({
                isModalOpen: true,
                modalData: {
                    ...this.state.modalData,
                    condmsg: true,
                    cantgomsg: false
                }
            });
        } else if (option === 'warning') {
            this.setState({
                isModalOpen: true,
                modalData: {
                    ...this.state.modalData,
                    warnmsg: true,
                    cantgomsg: false
                }
            });
        } else {
            this.setState({
                isModalOpen: true,
                modalData: {
                    condmsg: false,
                    warnmsg: false,
                    cantgomsg: false,
                    vehicleToPlanet: { 'selectedVehiclesArray': this.state.selectedVehiclesArray, 'selectedPlanetsArray': this.state.selectedPlanetsArray }
                }
            });
        }
    }
    closeHandleFn = () => {
        this.setState({
            isModalOpen: false
        })
    }
    resetHandleFn = () => {
        window.location.reload();
    }
    componentDidMount() {
        fetch(
            "https://findfalcone.herokuapp.com/vehicles")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    vehiclesfromapi: json
                });
            })
        fetch(
            "https://findfalcone.herokuapp.com/planets")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    planetsfromapi: json
                });
            })
    }
    render() {
        return (<>
            <Vehicles vehiclesfromapi={this.state.vehiclesfromapi} selectVehicleFn={this.selectVehicleFn} />
            <Planets planetsfromapi={this.state.planetsfromapi} selectPlanetsFn={this.selectPlanetsFn} timeTaken={this.state.timeTaken} />
            <Modal isModalOpen={this.state.isModalOpen} closeHandleFn={this.closeHandleFn} timeTaken={this.state.timeTaken} modalData={this.state.modalData} selectPair={this.state.selectPair} resetHandleFn={this.resetHandleFn} />
        </>)
    }
}
export default Appwrapper;