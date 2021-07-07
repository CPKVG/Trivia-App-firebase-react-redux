import React from 'react'
import './styles.scss'

const AuthWrapper = ({headLine, children }) => {
    return (
        <div className = "AuthWrapper">
            <div className = "wrap">
                {headLine && <h2>{headLine}</h2>}

              <div className = "children">
                {children && children} 
              </div>
            </div>
            
        </div>
    )
}

export default AuthWrapper
