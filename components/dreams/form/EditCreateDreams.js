import React, { Component } from "react";
import { Button, ScrollView, View } from "react-native";
import PropTypes from "prop-types";
import { Text } from "react-native-elements";
import { TextField } from "react-native-material-textfield";
import { Formik } from "formik";
import MultiSelect from "react-native-multiple-select";
import { connect } from "react-redux";

import commonsStyles from "../../../assets/styles/commonsStyles";

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
    this.items = [
      {
        id: "Voiture",
        name: "Voiture"
      },
      {
        id: "Avion",
        name: "Avion"
      },
      {
        id: "Train",
        name: "Train"
      },
      {
        id: "Bateaux",
        name: "Bateaux"
      },
      {
        id: "Vélo",
        name: "Vélo"
      }
    ];
  }

  render() {
    const { listDreams } = this.props;
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
          initialValues={dream ? dream : { catOfDream: [""] }}
          onSubmit={values => console.log(values)}
        >
          {props => {
            console.log("props", props);
            return (
              <React.Fragment>
                <TextField
                  label="Nom du rêve"
                  value={props.values.title}
                  onChangeText={props.handleChange("title")}
                  containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
                />
                <TextField
                  label="Pays"
                  value={props.values.country}
                  onChangeText={props.handleChange("country")}
                  containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
                />
                <Text>Catégorie</Text>
                <View style={{ flex: 1 }}>
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
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: "#CCC" }}
                    submitButtonColor="#CCC"
                    submitButtonText="Submit"
                  />
                  <View>
                    {this.multiSelect &&
                      this.multiSelect.getSelectedItemsExt(
                        props.values.catOfDream
                      )}
                  </View>
                </View>

                <TextField
                  label="Voyage prévu"
                  select
                  value={props.values.travel}
                  onChangeText={props.handleChange("travel")}
                  containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
                />
                <TextField
                  label="Titre du rêve"
                  value={props.values.pseudo}
                  onChangeText={props.handleChange("email")}
                  containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
                />
                <TextField
                  label="Titre du rêve"
                  value={props.values.pseudo}
                  onChangeText={props.handleChange("email")}
                  containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
                />
                <TextField
                  label="Titre du rêve"
                  value={props.values.pseudo}
                  onChangeText={props.handleChange("email")}
                  containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
                />
                <TextField
                  label="Titre du rêve"
                  value={props.values.pseudo}
                  onChangeText={props.handleChange("email")}
                  containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
                />
                <Button onPress={props.handleSubmit} title="Submit" />
              </React.Fragment>
            );
          }}
        </Formik>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  listDreams: state.dreams.listeDreams
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCreateDreams);
