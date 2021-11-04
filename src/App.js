import "./App.css";
import { Component } from "react";
import { PersonaService } from "./service/PersoanService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default class App extends Component {
  constructor() {
    super();
   this.state = {
      visible: false,
      persona: {
        id: 0,
        age: 0,
        dob: "",
        email: "",
        name: "",
      },
    };
    this.iteams = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          alert("edited");
        },
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          alert("delate");
        },
      },
    ];

    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save.bind(this)}></Button>
      </div>
    );

    this.PersonaService = new PersonaService();
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.PersonaService.getAll().then((data) =>
      this.setState({ personas: data })
    );
    
  }

  save() {
     this.PersonaService.save(this.state.persona).then((data) => {
     });
  };

  

  render() {
    return (
      <div style={{ width: "80%", marginTop: "20%", margin: "0 auto" }}>
        <br />
        <Menubar model={this.iteams} />
        <br />
        <Panel header="React CRUD App">
          <DataTable value={this.state.personas}>
            <Column field="name" header="Nombre"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="dob" header="Fecha de nacimiento"></Column>
            <Column field="age" header="Edad"></Column>
          </DataTable>
        </Panel>

        <Dialog
          header="Crear estudiante"
          visible={this.state.visible}
          style={{ width: "400px" }}
          modal={true}
          onHide={() => this.setState({ visible: false })}
          footer={this.footer}
        >
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="name"
              value={this.state.persona.name}
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {

                  let persona = Object.assign({}, prevState.persona);
                  persona.name = val;

                  return { persona };
                });
              }}
            />
            <br />
            <label htmlFor="name">Name</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="email"
              value={this.state.email}
              onChange={(e) =>{
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.email = val;

                  return { persona };
                })}
              }
            />
            <label htmlFor="email">Email</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="dob"
              value={this.state.persona.dob}
              onChange={(e) =>{
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.dob = val;

                  return { persona };
                })}
              }
            />
            <br />
            <label htmlFor="dob">Fecha de nacimiento</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="edad"
              value={this.state.persona.age}
              onChange={(e) =>{
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.age = val;

                  return { persona };
                })}
              }
            />
            <br />
            <label htmlFor="edad">Edad</label>
          </span>
        </Dialog>
      </div>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
    });
  }
}
