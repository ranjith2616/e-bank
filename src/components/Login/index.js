import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = error => {
    this.setState({errorMsg: error})
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    console.log(response)

    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  renderLoginFormField = () => {
    const {userId, pin, errorMsg} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitLogin}>
        <div className="img-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />

          <div className="input-container">
            <h1 className="form-heading"> Welcome Back!</h1>
            <div className="input-card">
              <label htmlFor="userId" className="label">
                {' '}
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input-ele"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.onChangeUserId}
              />
            </div>

            <div className="input-card">
              <label htmlFor="pin" className="label">
                {' '}
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="input-ele"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.onChangePin}
              />
            </div>

            <button type="submit" className="login-btn">
              {' '}
              Login
            </button>
            <p className="error"> {errorMsg}</p>
          </div>
        </div>
      </form>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">{this.renderLoginFormField()}</div>
    )
  }
}

export default Login
