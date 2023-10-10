import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Home extends Component {
  onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/ebank/login" />
    }

    return (
      <div>
        <div className="home-bg-container">
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
              alt="website logo"
            />

            <button
              className="logout-btn"
              type="button"
              onClick={this.onLogoutBtn}
            >
              {' '}
              Logout{' '}
            </button>
          </div>

          <div className="body-container">
            <h1> Your Flexibility, Our Excellence</h1>

            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
              alt="digital card"
              className="digital-card"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
