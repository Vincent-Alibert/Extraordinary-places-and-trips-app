import React, { Component } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
//components
import { StyleSheet, View, Text } from "react-native";
import { Card, Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
//axios
import axios from "../../config/api";
//axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//actions
import setUser from "../../actions/login/setUser";
// styles
import commonsStyles from "../../assets/styles/commonsStyles";

export class Login extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password: "",
      messageError: null
    };
    this.setUser = this.setUser.bind(this);
    this.leaveError = this.leaveError.bind(this);
  }
  setUser() {
    const { mail, password } = this.state;
    const data = { mail, password };
    this.props.setUser(data, this.leaveError, () => {
      this.props.navigation.navigate("MapFlow");
    });
  }

  leaveError(message) {
    this.setState({ messageError: message });
  }

  render() {
    const { password, mail, messageError } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingTop: 40,
            paddingBottom: 40,
            ...commonsStyles.centerBottom
          }}
        >
          <Text style={{ ...commonsStyles.h1 }}>Extraordinary places</Text>
          <Text style={{ ...commonsStyles.h1 }}>and trips</Text>
        </View>
        <View
          style={{
            flex: 3,
            ...commonsStyles.centerCenter
          }}
        >
          <Card>
            <View
              style={{
                width: 250,
                padding: 20
              }}
            >
              <Text
                style={{ fontSize: 18, textAlign: "center", marginTop: 10 }}
              >
                Identification
              </Text>
              <TextField
                label="Email"
                value={mail}
                onChangeText={mail => this.setState({ mail })}
                containerStyle={{ marginBottom: 5 }}
              />
              <TextField
                label="Mot de passe"
                value={password}
                onChangeText={password => this.setState({ password })}
                containerStyle={{ marginBottom: 30 }}
              />
              <View style={{ alignItems: "center" }}>
                <Button
                  upperCase={false}
                  style={{
                    container: { ...commonsStyles.button },
                    text: {
                      color: commonsStyles.colors.white
                    }
                  }}
                  text="Connection"
                  onPress={() => this.setUser()}
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

        <View
          style={{
            flex: 1,
            paddingBottom: 20,
            ...commonsStyles.centerBottom
          }}
        >
          <Text
            onPress={() => this.props.navigation.navigate("InscriptionView")}
            style={{ ...commonsStyles.link }}
          >
            pas encore de compte ?
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = { setUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
