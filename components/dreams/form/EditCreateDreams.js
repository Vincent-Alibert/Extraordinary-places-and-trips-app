import React, { Component } from "react";
import { ScrollView, View, Picker } from "react-native";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";
import { Text } from "react-native-elements";
import { TextField } from "react-native-material-textfield";
import { Formik } from "formik";
import MultiSelect from "react-native-multiple-select";
import { connect } from "react-redux";

import commonsStyles from "../../../assets/styles/commonsStyles";
import submitDream from "../../../actions/dreams/submitDream";

export class EditCreateDreams extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
        ? `Edition du rêve ${navigation.getParam("name")}`
        : "Création d'un rêve"
    };
  };
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = { messageError: null };
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

  leaveError(message) {
    this.setState({ messageError: message });
  }

  submitData(values) {
    const valuesFormatted = { ...values };
    const { catOfDream: catDream } = valuesFormatted;
    let objectCatDream = [];
    for (let index = 0; index < catDream.length; index++) {
      const cat = catDream[index];
      objectCatDream.push({ name: cat });
    }
    valuesFormatted.catOfDream = objectCatDream;
    submitDream(valuesFormatted)
      .then(resp => {
        console.log("resp", JSON.stringify(resp));
        this.props.navigation.navigate("DreamViewList", {
          name: resp.data.name,
          id: resp.data.idDream
        });
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.leaveError({ message: error.response.data });
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
    const { listDreams } = this.props;
    const { messageError } = this.state;
    const idDream = this.props.navigation.getParam("id");
    let currentDream, dream;
    if (listDreams) {
      currentDream = listDreams.filter(dream => {
        return dream.idDream === idDream;
      });
      dream = currentDream[0];
    }
    return (
      <ScrollView
        style={{
          paddingBottom: commonsStyles.spacing.unit,
          paddingTop: commonsStyles.spacing.unit,
          paddingLeft: commonsStyles.spacing.unit,
          paddingRight: commonsStyles.spacing.unit
        }}
      >
        <Formik
          initialValues={dream ? dream : { catOfDream: [], catOfTransport: [] }}
          onSubmit={values => this.submitData(values)}
        >
          {props => {
            return (
              <View
                style={{
                  paddingBottom: commonsStyles.spacing.unit * 5
                }}
              >
                <TextField
                  label="Nom du rêve"
                  value={props.values.name}
                  onChangeText={props.handleChange("name")}
                  containerStyle={{
                    marginBottom: commonsStyles.spacing.unit
                  }}
                />
                <TextField
                  label="Pays"
                  value={props.values.country}
                  onChangeText={props.handleChange("country")}
                  containerStyle={{
                    marginBottom: commonsStyles.spacing.unit
                  }}
                />
                <TextField
                  label="Adresse"
                  value={props.values.adress}
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
                    selectedItems={props.values.catOfDream}
                    selectText="Catégorie"
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
                        props.values.catOfDream
                      )}
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
                    selectedValue={props.values.travel}
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
                {props.values.travel && (
                  <React.Fragment>
                    <TextField
                      label="Date prévue"
                      value={props.values.date}
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
                        selectedItems={props.values.catOfTransport}
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
                            props.values.catOfDream
                          )}
                      </View>
                    </View>
                    <TextField
                      label="Coût des transports"
                      value={props.values.costTransport}
                      onChangeText={props.handleChange("costTransport")}
                      containerStyle={{
                        marginBottom: commonsStyles.spacing.unit
                      }}
                    />
                    <TextField
                      label="Hébergement"
                      value={props.values.accommodation}
                      onChangeText={props.handleChange("accommodation")}
                      containerStyle={{
                        marginBottom: commonsStyles.spacing.unit
                      }}
                    />
                    <TextField
                      label="Coût de l'hébergement"
                      value={props.values.costAccommodation}
                      onChangeText={props.handleChange("costAccommodation")}
                      containerStyle={{
                        marginBottom: commonsStyles.spacing.unit
                      }}
                    />
                    <TextField
                      label="Que faire ?"
                      value={props.values.whatTodo}
                      onChangeText={props.handleChange("whatTodo")}
                      containerStyle={{
                        marginBottom: commonsStyles.spacing.unit
                      }}
                    />
                    <TextField
                      label="Où manger ?"
                      value={props.values.whereToEat}
                      onChangeText={props.handleChange("whereToEat")}
                      containerStyle={{
                        marginBottom: commonsStyles.spacing.unit
                      }}
                    />
                  </React.Fragment>
                )}
                <TextField
                  label="Note"
                  value={props.values.note}
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
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  listDreams: state.dreams.listDreams
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCreateDreams);
