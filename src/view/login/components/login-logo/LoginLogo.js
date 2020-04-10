import React from 'react';


import styles  from '../../login.css'

// @CSSModules(styles, { allowMultiple: true})
// export default class LoginLogo extends React.Component {
//   render() {
//     return (
//       <div styleName="ajk_logo">
//         <div styleName="logo_wrap">
//           <img src={require('../../../../assets/imgs/login/logo.png')} alt=""/>
//         </div>
//         <img src={require('../../../../assets/imgs/login/ajk_logo_title.png')} alt='' styleName="logo_title"/>
//       </div>
//     );
//   }
// }

export default function LoginLogo(props) {
  return (
    <div className={styles.ajk_logo}>
        <div className={styles.logo_wrap}>
          <img src={require('../../../../assets/imgs/login/logo.png')} alt=""/>
          {/* <img src={require('../../../../assets/imgs/login/logo_binzhi.png')} alt=""/> */}
        </div>
        <img src={require('../../../../assets/imgs/login/ajk_logo_title.png')} alt='' className={styles.logo_title}/>
      </div>
  )
}