import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Button } from "react-native-elements";
import { TextField } from "react-native-material-textfield";
// actions
import createUser from "../../actions/login/createUser";
// styles
import commonsStyles from "../../assets/styles/commonsStyles";

export class Inscription extends Component {
  static propTypes = {};
  static navigationOptions = {
    title: "Inscription"
  };
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      mail: "",
      password: "",
      passwordVerif: "",
      messageError: null
    };
    this.createUser = this.createUser.bind(this);
    this.leaveError = this.leaveError.bind(this);
  }

  createUser() {
    const { pseudo, mail, password, passwordVerif } = this.state;
    const data = { pseudo, mail, password, passwordVerif };
    if (password === passwordVerif) {
      this.props.createUser(data, this.leaveError, () => {
        this.props.navigation.navigate("MapFlow");
      });
    } else {
      this.leaveError("Les deux mots de passe doivent être identiques.");
    }
  }

  leaveError(message) {
    this.setState({ messageError: message });
  }

  render() {
    const { mail, pseudo, passwordVerif, password, messageError } = this.state;
    return (
      <View style={{ flex: 1, ...commonsStyles.centerCenter }}>
        <Card>
          <View
            style={{
              width: 250,
              padding: commonsStyles.spacing.unit * 4
            }}
          >
            <TextField
              label="Pseudo"
              value={pseudo}
              onChangeText={pseudo => this.setState({ pseudo })}
              containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
            />
            <TextField
              label="mail"
              value={mail}
              onChangeText={mail => this.setState({ mail })}
              containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
            />
            <TextField
              label="Mot de passe"
              value={password}
              onChangeText={password => this.setState({ password })}
              containerStyle={{ marginBottom: commonsStyles.spacing.unit }}
            />
            <TextField
              label="Vérification mot de passe"
              value={passwordVerif}
              onChangeText={passwordVerif => this.setState({ passwordVerif })}
              containerStyle={{ marginBottom: commonsStyles.spacing.unit * 6 }}
            />
            <View style={{ alignItems: "center" }}>
              <Button
                upperCase={false}
                buttonStyle={{
                  ...commonsStyles.button
                }}
                titleStyle={{
                  color: commonsStyles.colors.white
                }}
                text="Valider"
                onPress={() => this.createUser()}
              />
            </View>
            {messageError && (
              <View
                style={{
                  marginTop: commonsStyles.spacing.unit,
                  alignItems: "center"
                }}
              >
                <Text style={commonsStyles.messageError}>{messageError}</Text>
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = { createUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inscription);
