import React from 'react';
import { connect } from 'react-redux';


const Platform = ({platformIds}) => {
    console.log('hello')
return (
    <div>
        <main>
            hello
            <ul>
            { platformIds.map(product=>{
          return (
            <li key={product.id}><img src={product.imageUrl}/> {product.name} 
            </li>
          )
        }).slice(0,5)}
            </ul>
        </main>
    </div>

)
}

const mapStateToProps = ({product})=> {
    const platformIds = product.filter(product => product.theme === 'platformIds');

    return {
        platformIds
    };
  }





export default connect(mapStateToProps)(Platform)