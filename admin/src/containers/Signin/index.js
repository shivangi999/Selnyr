import React, { useState, useEffect, Component } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { login, isUserLoggedIn } from '../../actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

/**
* @author
* @function Signin
**/

const Signin = (props) => {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

  // componentDidMount(){
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  //
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }



    const userLogin = (e) => {

        e.preventDefault();


        const user = {
            email, password
        }
        // console.log(user);
        dispatch(login(user));
        isUserLoggedIn()
          .then(
            user => {
              // return dashboard
              history.push('/');
            },
            error => {
              console.log(error);
            }
          );

        // if(auth.authenticate){
        //     return <Redirect to={`/`} />
        // }

    }



    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )

}

export default Signin;
