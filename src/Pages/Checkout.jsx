import React from 'react';
import Header from './Header';

const Checkout = () => {
  const styles = {
    modal: {
      padding: '20px',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      margin: 'auto',
      marginTop: '50px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    inputContainer: {
      marginBottom: '15px'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    inputField: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    button: {
      padding: '10px',
      background: 'black',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    separator: {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 0'
    },
    line: {
      flex: 1,
      height: '1px',
      background: '#ccc'
    },
    paymentOptions: {
      display: 'flex',
      justifyContent: 'center'
    }
  };

  return (
    <>
    <Header/>
    <div style={styles.modal}>
      <form style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.inputLabel}>Card holder full name</label>
          <input type="text" placeholder="Enter your full name" style={styles.inputField} />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.inputLabel}>Card Number</label>
          <input type="number" placeholder="0000 0000 0000 0000" style={styles.inputField} />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.inputLabel}>Expiry Date / CVV</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="01/23" style={styles.inputField} />
            <input type="number" placeholder="CVV" style={styles.inputField} />
          </div>
        </div>
        <button style={styles.button}>Checkout</button>
        <div style={styles.separator}>
          <hr style={styles.line} />
          <p>or pay using e-wallet</p>
          <hr style={styles.line} />
        </div>
        <div style={styles.paymentOptions}>
          <button type="button" name="paypal" style={styles.button}>Pay with PayPal</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Checkout;
