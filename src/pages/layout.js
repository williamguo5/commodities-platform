import React from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

export default class Layout extends React.Component {
  render() {
    return (
      <main>
        <Navbar/>
        {this.props.children}
        <Footer/>
      </main>
    );
  }
}