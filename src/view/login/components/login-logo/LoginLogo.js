import React from 'react';


import styles from '../../login.css'

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
  const title = sessionStorage.getItem('title')
  return (
    <div className={styles.ajk_logo}>
      <div className={styles.logo_wrap}>
        {
          title == 'anasu' ?
            <img src={require('../../../../assets/imgs/login/anasu.png')} alt="" /> :
            <img src={require('../../../../assets/imgs/login/logo.png')} alt="" />
        }
      </div>
      {
        title == 'anasu' ? null :
        <img src={require('../../../../assets/imgs/login/ajk_logo_title.png')} alt='' className={styles.logo_title} />
      }
    </div>
  )
}