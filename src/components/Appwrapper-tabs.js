import React from "react";
import '../assets/css/custom-styles.css';
import '../assets/css/main.css';

class Appwrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'one'
        }
    }
    showActiveTabContent = (e) => {
        // console.log(e.target.getAttribute('data-tab'));
        this.setState({
            activeTab: e.target.getAttribute('data-tab')
        })
    }
    render() {
        return (<>
            <div className="tabsNcontent-group col-12 p-0">
                <div className="tabs-group">
                    <div
                        className={`gen-tab ${this.state.activeTab === 'one' ? 'active' : ''}`}
                        data-tab="one"
                        onClick={e => this.showActiveTabContent(e)}>Planet-1 to find in
                    </div>
                    <div
                        className={`gen-tab ${this.state.activeTab === 'two' ? 'active' : ''}`}
                        data-tab="two"
                        onClick={e => this.showActiveTabContent(e)}>Planet-2 to find in
                    </div>
                    <div
                        className={`gen-tab ${this.state.activeTab === 'thr' ? 'active' : ''}`}
                        data-tab="thr"
                        onClick={e => this.showActiveTabContent(e)}>Planet-3 to find in
                    </div>
                    <div
                        className={`gen-tab ${this.state.activeTab === 'fou' ? 'active' : ''}`}
                        data-tab="fou"
                        onClick={e => this.showActiveTabContent(e)}>Planet-4 to find in
                    </div>
                </div>
                <div className="contents-group px-3 pb-3 pt-0">
                    <div
                        data-content="one"
                        className={this.state.activeTab === 'one' ? 'active' : ''}>
                        <h1>Tab One Content</h1>
                    </div>
                    <div
                        data-content="two"
                        className={this.state.activeTab === 'two' ? 'active' : ''}>
                        <h1>Tab Two Content</h1>
                    </div>
                    <div
                        data-content="one"
                        className={this.state.activeTab === 'thr' ? 'active' : ''}>
                        <h1>Tab thr Content</h1>
                    </div>
                    <div
                        data-content="two"
                        className={this.state.activeTab === 'fou' ? 'active' : ''}>
                        <h1>Tab fou Content</h1>
                    </div>
                </div>
            </div>
        </>)
    }
}
export default Appwrapper;