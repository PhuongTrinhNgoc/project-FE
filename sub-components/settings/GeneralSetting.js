import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { callUpdateProfileAdmin } from 'lib/api';
import Cookies from 'js-cookie';
import ToastConfig from 'lib/toast';
import { DropFiles } from 'widgets';

const GeneralSetting = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [credentials, setCredentials] = useState({
    userType: '0',
    firstName: '',
    lastName: '',
  });
  const [userInfo, setUserInfo] = useState(null); // State to hold userInfo
  const [token, setToken] = useState(null); // State to hold the token

  useEffect(() => {
    // Chỉ chạy trên client
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', credentials.firstName);
    formData.append('lastName', credentials.lastName);
  
    if (selectedFiles[0]) {
      formData.append('profilePicture', selectedFiles[0]); // Appending the actual file
    }
    
    try {
      const response = await callUpdateProfileAdmin(formData,token);
      if (response) {
        setShow(true);
        setError(null);
        const updatedUserInfo = {
          ...userInfo,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          profilePicture: selectedFiles[0] ? URL.createObjectURL(selectedFiles[0]) : userInfo.profilePicture
        };
  
        Cookies.set('infoUser', JSON.stringify(updatedUserInfo), { expires: 7 }); 

        setUserInfo(updatedUserInfo);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      
    }
  };
  

  useEffect(() => {
    const infoUserCookie = Cookies.get('infoUser');

    if (infoUserCookie) {
      try {
        const parsedUserInfo = JSON.parse(infoUserCookie);
        setUserInfo(parsedUserInfo); // Store userInfo in state
        setCredentials((prev) => ({
          ...prev,
          firstName: parsedUserInfo.firstName || '',
          lastName: parsedUserInfo.lastName || '',
        }));
      } catch (error) {
        console.error('Failed to parse user info:', error);
      }
    }
  }, []); // Chạy effect này chỉ khi component mount

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
          <p className="mb-0 fs-5 text-muted">Profile configuration settings</p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          <Card.Body>
            <div className="mb-6">
              <h4 className="mb-1">General Settings</h4>
            </div>
            <Row className="align-items-center mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                <h5 className="mb-0">Avatar</h5>
              </Col>
              <Col md={9}>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <Image
                      src={
                        selectedFiles[0]?.preview || userInfo?.profilePicture
                      }
                      className="rounded-circle avatar avatar-lg"
                      alt=""
                    />
                  </div>
                  <div>
                    <DropFiles onFilesSelected={handleFilesSelected} />
                    <Button
                      onClick={() => setSelectedFiles([])}
                      variant="outline-white"
                      className="ms-2"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <label htmlFor="fullName" className="col-sm-4 col-form-label">
                  Full name
                </label>
                <div className="col-sm-4 mb-3 mb-lg-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    id="firstName"
                    name="firstName"
                    required
                    value={credentials.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    id="lastName"
                    name="lastName"
                    value={credentials.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Row>
              <Button variant="outline-white" type="submit">
                Save
              </Button>
            </Form>

            {show && (
              <ToastConfig
                title="Success"
                time="Just now"
                bodyTitle="Profile updated successfully!"
                setShow={setShow}
                show={show}
                bg="success"
                textStyle={{ color: 'white' }}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralSetting;
