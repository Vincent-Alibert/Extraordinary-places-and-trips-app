import React, { Component } from "react";
import { Text, View } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";
import commonsStyles from "../../assets/styles/commonsStyles";

export default class Burger extends Component {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    const { creationLink } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10
        }}
      >
        <Menu
          ref={this.setMenuRef}
          style={{}}
          button={
            <Icon
              color={commonsStyles.colors.primary}
              name="more-horiz"
              onPress={this.showMenu}
            />
          }
        >
          <MenuItem
            onPress={() => {
              this.props.navigation.navigate("MapView");
              this.hideMenu();
            }}
          >
            Carte des rêves
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              this.props.navigation.navigate("DBCList");
              this.hideMenu();
            }}
          >
            Rêves par catégories
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              this.props.navigation.navigate(creationLink);
              this.hideMenu();
            }}
          >
            Ajouter un rêve
          </MenuItem>
          {/* <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem> */}
        </Menu>
      </View>
    );
  }
}
