import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import SearchBox from "./SearchBox";
import { login, logout, register } from "../actions/userActions";

const host = "psnacet.edu.in";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "643531290096-d0qt2hmkj5bjkgq986cf43qo6mtstr03.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.username = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getEmail()
        .split("@")[0];
      console.log(this.props.isSignedIn);
      this.props.login(this.username).then(() => {
        const domain = window.gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getHostedDomain();
        if (domain === host && !this.props.isSignedIn) {
          const gProfile = window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getBasicProfile();
          const name = gProfile.getName(),
            userType = gProfile.getGivenName().match(/^\d/) ? 1 : 2,
            username = gProfile.getEmail().split("@")[0];
          console.log(name, userType, username);
          this.props.register(name, userType, username);
          this.username = username;
        }
      });
    } else {
      this.props.logout();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
    console.log(this.props.isSignedIn);
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn) {
      return (
        <>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-5'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Nav>
            <Nav className='ms-5'>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className='fas fa-home'></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/chats'>
                <Nav.Link>
                  <i className='fas fa-comment-alt'></i> Message
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/event'>
                <Nav.Link>
                  <i className='fas fa-calendar-week'></i> Event
                </Nav.Link>
              </LinkContainer>
              {/* <LinkContainer className='me-4' to='/notification'>
                <Nav.Link>
                  <i className='fas fa-bell'></i> Notifications
                </Nav.Link>
              </LinkContainer> */}
              <NavDropdown
                id='nav-dropdown-dark-example'
                title='notifications'
                menuVariant='dark'
              >
                {this.props.isSignedIn.notifications &&
                this.props.isSignedIn.notifications.length > 0 ? (
                  this.props.isSignedIn.notifications.reverse().map((noti) => (
                    <LinkContainer to={noti.url}>
                      <NavDropdown.Item>
                        <p style={{ wordWrap: "break-word", width: "20vw" }}>
                          <Image
                            src={noti.img}
                            style={{ width: "2vw", float: "left" }}
                            roundedCircle
                          />{" "}
                          {noti.msg}
                        </p>
                      </NavDropdown.Item>
                    </LinkContainer>
                  ))
                ) : (
                  <NavDropdown.Item>No Notifications Yet</NavDropdown.Item>
                )}
              </NavDropdown>
              <NavDropdown
                id='nav-dropdown-dark-example'
                title={`${this.username}`}
                menuVariant='dark'
              >
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <i className='fas fa-user'></i> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/clubs'>
                  <NavDropdown.Item>
                    <i className='fas fa-users'></i> Clubs
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/settings'>
                  <NavDropdown.Item>
                    <i className='fas fa-cogs'></i> Settings
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/help'>
                  <NavDropdown.Item>
                    <i className='fas fa-question-circle'></i> Help
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to='/'>
                  <NavDropdown.Item onClick={this.onSignOutClick}>
                    <i className='fas fa-sign-out-alt'></i> Logout
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </>
        // <button onClick = {this.onSignOutClick} className = 'ui red google button'>
        //     <i className = "google icon" />
        //     Sign Out
        // </button>
      );
    } else {
      return (
        <Button
          onClick={this.onSignInClick}
          variant='danger'
          className='text-center'
        >
          <i className='fab fa-google-plus fa-2x me-3' />{" "}
          <span> Sign In with Google</span>
        </Button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.userLogin.userInfo };
};

export default connect(mapStateToProps, { login, logout, register })(
  GoogleAuth
);
