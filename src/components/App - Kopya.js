import React from "react";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            communication: {
                receiver: "notSelected",
                id: 0,
                info: {}
            }
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div style={{ height: "100%" }}>
                {/* <Content communication={this.state.communication} />
                <BottomBar communication={this.state.communication} /> */}
            </div>
        );
    }
}
export default App;
console.log(   "hello")