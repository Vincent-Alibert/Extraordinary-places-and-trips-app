import React, { Component } from "react";
import { Text, View } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";

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
          button={<Icon name="more-horiz" onPress={this.showMenu} />}
        >
          <MenuItem onPress={this.hideMenu}>Carte des rêves</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Rêves par catégories</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Ajouter un rêve</MenuItem>
          {/* <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem> */}
        </Menu>
      </View>
    );
  }
}
