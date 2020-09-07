import React from 'react'

const Login = () => {
  return (
      <div style={formStyle} className="row grey lighten-5">
        <form className="col s12">
          <div className="row">
            <div className="input-field">
              <input type="email" name="email" className="validate"/>
              <label htmlFor="email" className="active">
                Email
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input className="validate" type="password" name="password" />
              <label htmlFor="password" className="active">
                Password
              </label>
            </div>
          </div>
          <div className="row">
            <button className="col offset-s3 s6 btn btn-large waves-effect blue">Login</button>
          </div>
        </form>
      </div>
  )
}

const formStyle = {
  padding: '2rem 4rem',
  marginTop: '4rem'
}

export default Login
