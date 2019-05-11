import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Button } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";
// styles
import commonStyles from "../../assets/styles/commonsStyles";

export class Login extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordVerif: ""
    };
  }

  render() {
    const { email, name, passwordVerif, password } = this.state;
    return (
      <View style={{ flex: 1, ...commonStyles.centerCenter }}>
        <Card>
          <View
            style={{
              minWidth: 250,
              padding: 20
            }}
          >
            <TextField
              label="Nom"
              value={name}
              onChangeText={name => this.setState({ name })}
              containerStyle={{ marginBottom: 5 }}
            />
            <TextField
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
              containerStyle={{ marginBottom: 5 }}
            />
            <TextField
              label="Mot de passe"
              value={password}
              onChangeText={password => this.setState({ password })}
              containerStyle={{ marginBottom: 5 }}
            />
            <TextField
              label="Vérification mot de passe"
              value={passwordVerif}
              onChangeText={passwordVerif => this.setState({ passwordVerif })}
              containerStyle={{ marginBottom: 30 }}
            />
            <View style={{ alignItems: "center" }}>
              <Button
                upperCase={false}
                style={{
                  container: { ...commonStyles.button },
                  text: {
                    color: commonStyles.colors.white
                  }
                }}
                text="Valider"
                onPress={() => {}}
              />
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default Login;
