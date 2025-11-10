import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container, Box, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ShoppingItemList from './components/ShoppingItemList';

const QueryClient = new QueryClient();

function App() {
  const [ inAuthenticated, setIsAuthenticated ] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('jwt');
      setIsAuthenticated(!!token);
    };
    checkAuth();  // 위에서 정의한거 바로 호출.
    window.addEventListener('storage', checkAuth);  // 다른 탭에서의 변경을 감지하기 위해 추가.
    return () => {
      window.removeEventListener('storage', checkAuth);
    }
  } []);
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  }
  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    setIsAuthenticated(false);
    queryClient
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow : 1}} >
            쇼핑리스트 ShoppingList
          </Typography>
        </Toolbar>
      </AppBar>
      <AddItem addItem={addItem} />
      <List>
        {
          items.map((item, index) =>
            <ListItem key={index} divider>
              <ListItemText
                primary={item.product}
                secondary={item.amount}/>
            </ListItem>
          )
        }
      </List>
    </Container>
  )
}

export default App
