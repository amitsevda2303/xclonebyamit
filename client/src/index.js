import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './context/Context';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient, InMemoryCache,ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_PORT}/graphql`,
  cache: new InMemoryCache(),
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    
  <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>
  </ApolloProvider>
);

reportWebVitals();
