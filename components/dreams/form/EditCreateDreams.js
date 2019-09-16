import React, { Component } from "react";
import { ScrollView, View, Picker, Text } from "react-native";
import { Button } from "react-native-elements";
import { TextField } from "react-native-material-textfield";
import { Formik } from "formik";
import MultiSelect from "react-native-multiple-select";
import getOneDream from "../../../actions/dreams/getOneDream";
import submitDream from "../../../actions/dreams/submitDream";
import updateDream from "../../../actions/dreams/updateDream";
// styles
import commonsStyles from "../../../assets/styles/commonsStyles";

export class EditCreateDreams extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
        ? `Edition du rêve ${navigation.getParam("name")}`
        : "Création d'un rêve"
    };
  };
  constructor(props) {
    super(props);
    this.state = { messageError: null, dream: null, animation: false };
    this.items = [
      {
        id: "Insolite",
        name: "Insolite"
      },
      {
        id: "Monument",
        name: "Monument"
      },
      {
        id: "Parc",
        name: "Parc"
      },
      {
        id: "Aventure",
        name: "Aventure"
      }
    ];
    this.travelBool = [
      {
        id: "Oui",
        name: true
      },
      {
        id: "Non",
        name: false
      }
    ];
    this.catTrans = [
      {
        id: "Avion",
        name: "Avion"
      },
      {
        id: "Bateau",
        name: "Bateau"
      },
      {
        id: "Voiture",
        name: "Voiture"
      },
      {
        id: "Vélo",
        name: "Vélo"
      }
    ];
    this.submitData = this.submitData.bind(this);
    this.leaveError = this.leaveError.bind(this);
    this.showMessageError = this.showMessageError.bind(this);
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");

    if (id) {
      getOneDream(id)
        .then(resp => {
          this.setState({ animation: true, dream: resp.data });
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.leaveError(error.response);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            this.leaveError("Une erreur est survenue pendant la requête");
          } else {
            // Something happened in setting up the request that triggered an Error

            this.leaveError("Une erreur est survenue");
          }
        });
    } else {
      this.setState({ animation: true });
    }
  }

  leaveError(message) {
    this.setState({ messageError: message });
  }

  submitData(values) {
    const routeName = this.props.navigation.state.routeName;
    const initDream = this.state.dream;
    switch (routeName) {
      case "DBCModifDream":
      case "DBCCreateDream":
        modifRoute = "DBCDreamView";
        break;
      case "DFOCModifDream":
      case "DFOCCreateDream":
        modifRoute = "DFOCDreamView";
        break;
      case "MapModifDream":
      case "MapDreamCreateView":
        modifRoute = "MapDreamView";
        break;

      default:
        modifRoute = "DBCDreamView";
        break;
    }

    const valuesFormatted = { ...values };
    const { catOfDream: catDream } = valuesFormatted;
    let objectCatDream = [];
    for (let index = 0; index < catDream.length; index++) {
      const cat = catDream[index];
      // if (initDream) {
      //   if (!initDream.catOfDream.includes(cat)) {
      //     objectCatDream.push({ name: cat });
      //   }
      // } else {
      objectCatDream.push({ name: cat });
      // }
    }
    valuesFormatted.catOfDream = objectCatDream;

    const { catOfTransport: catTransp } = valuesFormatted;
    let objectCatTransp = [];
    for (let index = 0; index < catTransp.length; index++) {
      const cat = catTransp[index];
      // if (initDream) {
      //   if (!initDream.catOfTransport.includes(cat)) {
      //     objectCatTransp.push({ name: cat });
      //   }
      // } else {
      objectCatTransp.push({ name: cat });
      // }
    }
    valuesFormatted.catOfTransport = objectCatTransp;

    for (const field in valuesFormatted) {
      const value = valuesFormatted[field];
      if (value === null) {
        delete valuesFormatted[field];
      }
    }
    const send = this.props.navigation.getParam("id")
      ? updateDream(valuesFormatted)
      : submitDream(valuesFormatted);
    send
      .then(resp => {
        this.props.navigation.replace(modifRoute, {
          name: resp.data.name,
          id: resp.data.idDream
        });
        this.props.navigation.navigate(modifRoute, {
          name: resp.data.name,
          id: resp.data.idDream
        });
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.leaveError({ ...error.response.data });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          this.leaveError({
            message: "Une erreur est survenue pendant la requête"
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          this.leaveError({ message: "Une erreur est survenue" });
        }
      });
  }

  showMessageError() {
    const { messageError } = this.state;
    let stringMessage = [];
    for (const key in messageError) {
      if (messageError.hasOwnProperty(key)) {
        const message = messageError[key];
        stringMessage.push(
          <Text style={{ color: commonsStyles.colors.error }} key={key}>
            {key} : {message[0]}
          </Text>
        );
      }
    }
    return stringMessage;
  }

  render() {
    const { dream, animation } = this.state;
    const { messageError } = this.state;
    console.log("dream :", dream);
    return (
      <ScrollView
        style={{
          paddingBottom: commonsStyles.spacing.unit,
          paddingTop: commonsStyles.spacing.unit,
          paddingLeft: commonsStyles.spacing.unit,
          paddingRight: commonsStyles.spacing.unit
        }}
      >
        {animation ? (
          <Formik
            initialValues={
              dream ? dream : { catOfDream: [], catOfTransport: [] }
            }
            onSubmit={values => this.submitData(values)}
          >
            {props => {
              const datas = props.values;
              return (
                <View
                  style={{
                    paddingBottom: commonsStyles.spacing.unit * 5
                  }}
                >
                  <TextField
                    label="Nom du rêve"
                    value={datas.name ? datas.name : ""}
                    onChangeText={props.handleChange("name")}
                    containerStyle={{
                      marginBottom: commonsStyles.spacing.unit
                    }}
                  />
                  <TextField
                    label="Pays"
                    value={datas.country ? datas.country : ""}
                    onChangeText={props.handleChange("country")}
                    containerStyle={{
                      marginBottom: commonsStyles.spacing.unit
                    }}
                  />
                  <TextField
                    label="Adresse"
                    value={datas.adress ? datas.adress : ""}
                    onChangeText={props.handleChange("adress")}
                    containerStyle={{
                      marginBottom: commonsStyles.spacing.unit
                    }}
                  />

                  <View
                    style={{
                      flex: 1,
                      marginTop: commonsStyles.spacing.unit * 2,
                      marginBottom: 0
                    }}
                  >
                    <MultiSelect
                      hideTags
                      items={this.items}
                      uniqueKey="id"
                      ref={component => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={selectedItems =>
                        props.setFieldValue("catOfDream", selectedItems)
                      }
                      selectedItems={datas.catOfDream}
                      selectText="Catégorie"
                      searchInputPlaceholderText="Search Items..."
                      altFontFamily="Roboto"
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: "#CCC" }}
                      submitButtonColor="#CCC"
                      submitButtonText="Choisir"
                    />
                    <View>
                      {this.multiSelect &&
                        this.multiSelect.getSelectedItemsExt(datas.catOfDream)}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginTop: commonsStyles.spacing.unit * 2,
                      borderBottomColor: "rgba(0, 0, 0, .1)",
                      borderBottomWidth: 1,
                      marginBottom: 0
                    }}
                  >
                    <Text style={{ color: "rgba(0, 0, 0, .4)", fontSize: 15 }}>
                      Voyage prévu ?
                    </Text>
                    <Picker
                      selectedValue={datas.travel}
                      style={{ height: 50 }}
                      onValueChange={itemValue =>
                        props.setFieldValue("travel", itemValue)
                      }
                    >
                      <Picker.Item label="Choix..." value={null} />
                      <Picker.Item label="Oui" value={true} />
                      <Picker.Item label="Non" value={false} />
                    </Picker>
                  </View>
                  {datas.travel && (
                    <React.Fragment>
                      <TextField
                        label="Date prévue"
                        value={datas.date ? datas.date : ""}
                        onChangeText={props.handleChange("date")}
                        containerStyle={{
                          marginBottom: commonsStyles.spacing.unit
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          marginTop: commonsStyles.spacing.unit * 2,
                          marginBottom: 0
                        }}
                      >
                        <MultiSelect
                          hideTags
                          items={this.catTrans}
                          uniqueKey="id"
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={selectedItems =>
                            props.setFieldValue("catOfTransport", selectedItems)
                          }
                          selectedItems={datas.catOfTransport}
                          selectText="Choix du transport"
                          searchInputPlaceholderText="Search Items..."
                          onChangeInput={text => console.log(text)}
                          altFontFamily="Roboto"
                          tagRemoveIconColor="#CCC"
                          tagBorderColor="#CCC"
                          tagTextColor="#CCC"
                          selectedItemTextColor="#CCC"
                          selectedItemIconColor="#CCC"
                          itemTextColor="#000"
                          displayKey="name"
                          searchInputStyle={{ color: "#CCC" }}
                          submitButtonColor="#CCC"
                          submitButtonText="Choisir"
                        />
                        <View>
                          {this.multiSelect &&
                            this.multiSelect.getSelectedItemsExt(
                              datas.catOfDream
                            )}
                        </View>
                      </View>
                      <TextField
                        label="Coût des transports"
                        value={
                          datas.costTransport ? `${datas.costTransport}` : ""
                        }
                        onChangeText={props.handleChange("costTransport")}
                        containerStyle={{
                          marginBottom: commonsStyles.spacing.unit
                        }}
                      />
                      <TextField
                        label="Hébergement"
                        value={datas.accommodation ? datas.accommodation : ""}
                        onChangeText={props.handleChange("accommodation")}
                        containerStyle={{
                          marginBottom: commonsStyles.spacing.unit
                        }}
                      />
                      <TextField
                        label="Coût de l'hébergement"
                        value={
                          datas.costAccommodation
                            ? `${datas.costAccommodation}`
                            : ""
                        }
                        onChangeText={props.handleChange("costAccommodation")}
                        containerStyle={{
                          marginBottom: commonsStyles.spacing.unit
                        }}
                      />
                      <TextField
                        label="Que faire ?"
                        value={datas.whatTodo ? datas.whatTodo : ""}
                        onChangeText={props.handleChange("whatTodo")}
                        containerStyle={{
                          marginBottom: commonsStyles.spacing.unit
                        }}
                      />
                      <TextField
                        label="Où manger ?"
                        value={datas.whereToEat ? datas.whereToEat : ""}
                        onChangeText={props.handleChange("whereToEat")}
                        containerStyle={{
                          marginBottom: commonsStyles.spacing.unit
                        }}
                      />
                    </React.Fragment>
                  )}
                  <TextField
                    label="Note"
                    value={datas.note ? datas.note : ""}
                    onChangeText={props.handleChange("note")}
                    containerStyle={{
                      marginBottom: commonsStyles.spacing.unit
                    }}
                  />
                  <Button
                    buttonStyle={{
                      ...commonsStyles.button
                    }}
                    titleStyle={{
                      color: commonsStyles.colors.white
                    }}
                    onPress={props.handleSubmit}
                    title="Submit"
                  />
                  {messageError && <View>{this.showMessageError()}</View>}
                </View>
              );
            }}
          </Formik>
        ) : (
          <View style={commonsStyles.dream.section}>
            <Text style={{ color: commonsStyles.colors.primary }} h4>
              Chargement en cours ...
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}
export default EditCreateDreams;
