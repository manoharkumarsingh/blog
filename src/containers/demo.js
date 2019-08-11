import React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar
} from "@progress/kendo-react-grid";
import { GridCell } from "@progress/kendo-react-grid";
import { claimdata } from "./SampleProduct";
import DialogContainer from "./DialogContainer.jsx";
import { LinkContainer } from "react-router-bootstrap";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import "@progress/kendo-theme-default/dist/all.css";
import cellWithEditing from "./cellWithEditing.jsx";
import "./HomeGrid.css";
// class CustomCell extends React.Component {
//     render() {
//         const value = this.props.dataItem[this.props.field];

//         return (
//             <td >{this.props.myProp? <div>
//                              <LinkContainer to="/payment" style={{ color:'blue',textDecoration: 'underline' }}>
//                                 <div className="Approved" >Approved</div>
//                             </LinkContainer>
//                         </div>
//                         :<div>

//                                 <div className="Pending" ></div>

//                         </div>}
//                         {
//                 (value === null) ? '' : this.props.dataItem[this.props.field]}
//             </td>
//         );
//     }
// }

class HomeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insurancedata: claimdata.slice(0),
      dataInEdit: undefined,
      showing: true
    };
  }
  edit = dataItem => {
    this.setState({ dataInEdit: this.cloneData(dataItem) });
  };
  // MyCustomCell = (props) => <CustomCell {...props} myProp={this.state.insurancedata[0].status==="Approved"} />
  // edit = (dataItem) => {
  //     this.setState({ dataInEdit: this.cloneData(dataItem) });
  // }

  // remove = (dataItem) => {
  //     const insurancedata = this.state.insurancedata.slice();
  //     const index = insurancedata.findIndex(p => p.PolicyNumber === dataItem.PolicyNumber);
  //     if (index !== -1) {
  //         insurancedata.splice(index, 1);
  //         this.setState({
  //             insurancedata: insurancedata
  //         });
  //     }
  //     console.log("value",insurancedata)
  // }

  // validate = (dataItem) =>{
  //     const { showing } = this.state;

  //     this.setState({ showing: !showing })

  // console.log("showing",this.state.showing);
  // }
  save = () => {
    const dataItem = this.state.dataInEdit;
    const insurancedata = this.state.insurancedata.slice();

    if (dataItem.PolicyNumber !== null) {
      insurancedata.unshift(this.newData(dataItem));
    } else {
      const index = insurancedata.findIndex(
        p => p.PolicyNumber === dataItem.PolicyNumber
      );
      insurancedata.splice(index, 1, dataItem);
    }

    this.setState({
      insurancedata: insurancedata,
      dataInEdit: undefined
    });
    console.log("value");
  };

  cancel = () => {
    this.setState({ dataInEdit: undefined });
  };

  insert = () => {
    this.setState({ dataInEdit: {} });
  };

  render() {
    return (
      <div>
        <Grid data={this.state.insurancedata} style={{ height: "420px" }}>
          <GridToolbar>
            <button onClick={this.insert} className="k-button">
              Add New
            </button>
          </GridToolbar>
          <Column field="CaseNumber" title="Case Number" />
          <Column field="PolicyNumber" title="PolicyNumber" />
          <Column field="Name" title="Name" />
          <Column field="NotifierName" title="Notifier Name" />
          <Column field="DOB" title="DOB" editor="date" format="{0:d}" />
          <Column field="MannerofDeath" title="Manner of Death" />
          <Column
            field="DateofClaim"
            title="Date of Claim"
            editor="date"
            format="{0:d}"
          />
          {this.state.insurancedata[0].status === true ? (
            <Column
              field="status"
              cell={props => (
                <td>
                  <a href="https://stackblitz.com/run/?file=app%2Fmain.jsx">
                    Approved
                  </a>
                </td>
              )}
            />
          ) : (
            <Column field="status" />
          )}
          <Column title="Edit" cell={cellWithEditing(this.edit)} />
        </Grid>
        {this.state.dataInEdit && (
          <DialogContainer
            dataItem={this.state.dataInEdit}
            save={this.save}
            cancel={this.cancel}
            validate={this.validate}
          />
        )}
      </div>
    );
  }

  dialogTitle() {
    return `${
      this.state.dataInEdit.PolicyNumber !== null ? "Add" : "Edit"
    } data`;
  }
  cloneData(cdata) {
    return Object.assign({}, cdata);
  }

  newData(source) {
    const newData = {
      PolicyNumber: "",
      CaseNumber: "",
      Name: "",
      NotifierName: "",
      DOB: "",
      MannerofDeath: "",
      DateofClaim: ""
    };

    return Object.assign(newData, source);
  }

  // generateId() {
  //     let id = 1;
  //     this.state.insurancedata.forEach(p => { id = Math.max((p.Id || 0) + 1, id); });
  //     return id;
  // }
}

export default HomeGrid;
