import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './context/Context';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient, InMemoryCache,ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:7000/graphql",
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
