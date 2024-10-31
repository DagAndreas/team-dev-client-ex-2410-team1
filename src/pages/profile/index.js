import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '../../components/avatar';
import { get, patch } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import Form from '../../components/form';
import TextInput from '../../components/form/textInput';

import './styles.css';

const ProfilePage = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { token } = useAuth();
  const [canEdit, setCanEdit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [prevProfileUserId, setPrevProfileUserId] = useState(null); // New state variable

  useEffect(() => {
    const fetchUserData = async (profileId, setter) => {
      try {
        const response = await get(`users/${profileId}`);
        setter(response.data.user);
      } catch (error) {
        console.error(`Error fetching user data for ID ${profileId}:`, error);
      }
    };

    if (token) {
      const loggedInId = jwtDecode(token).userId;
      fetchUserData(id, setProfileUser); // Fetch profile user data
      fetchUserData(loggedInId, setLoggedInUser); // Fetch logged-in user data
    }
  }, [id, token]);

  useEffect(() => {
    if (profileUser && loggedInUser) {
      setCanEdit(profileUser.id === loggedInUser.id || loggedInUser.role === 'teacher');
    }
  }, [profileUser, loggedInUser]);

  useEffect(() => {
    if (profileUser) {
      if (profileUser.id !== prevProfileUserId) {
        // Initialize formData with profileUser data only if the user ID has changed
        setFormData({ ...profileUser });
        setPrevProfileUserId(profileUser.id);
      }
    }
  }, [profileUser, prevProfileUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    // Implement the API call to save the updated data
    // create the data from formdata
    console.log('Save form:', formData);

    // changed data from profile to form:
    const changeData = {
    }
    
  
    patch(`users/${profileUser.id}`, formData)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
      });
    // Example PATCH request:
    // await patch(`users/${profileUser.id}`, formData);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {profileUser && loggedInUser && formData ? (
        <div className="info">
          <Avatar user={profileUser} />
          <div className="divider">
            {/* Basic Info */}
            <Form className="basic-info-form">
              <h2>Basic Info</h2>
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt="avatar"
              />

              <TextInput
                value={formData.firstName}
                onChange={handleInputChange}
                name="firstName"
                label="First Name"
                readOnly={!canEdit}
              />
              <TextInput
                value={formData.lastName}
                onChange={handleInputChange}
                name="lastName"
                label="Last Name"
                readOnly={!canEdit}
              />
              <TextInput
                value={formData.githubUsername}
                onChange={handleInputChange}
                name="githubUsername"
                label="GitHub Username"
                readOnly={!canEdit}
              />
            </Form>

            {/* Conditionally Render Sections Based on jobTitle */}
            {profileUser.jobTitle ? (
              // If jobTitle exists, assume Teacher
              <Form className="professional-info-form">
                <h2>Professional Info</h2>
                <TextInput
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  name="jobTitle"
                  label="Job Title"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.specialism}
                  onChange={handleInputChange}
                  name="specialism"
                  label="Specialism"
                  readOnly={!canEdit}
                />
              </Form>
            ) : (
              // Else, render Training Info (Student)
              <Form className="training-info-form">
                <h2>Training Info</h2>
                <TextInput
                  value={formData.specialism}
                  onChange={handleInputChange}
                  name="specialism"
                  label="Specialism"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.cohort}
                  onChange={handleInputChange}
                  name="cohort"
                  label="Cohort"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.startDate}
                  onChange={handleInputChange}
                  name="startDate"
                  label="Start Date"
                  readOnly={!canEdit}
                />
                <TextInput
                  value={formData.endDate}
                  onChange={handleInputChange}
                  name="endDate"
                  label="End Date"
                  readOnly={!canEdit}
                />
              </Form>
            )}
          </div>

          <div className="divider">
            {/* Contact Info */}
            <Form className="contact-info-form">
              <h2>Contact Info</h2>
              <TextInput
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                label="Email"
                readOnly={!canEdit}
              />
              <TextInput
                value={formData.mobile}
                onChange={handleInputChange}
                name="mobile"
                label="Mobile"
                type="restricted"
                readOnly={!canEdit}
              />
              <TextInput
                value="******"
                onChange={() => {}}
                name="password"
                label="Password"
                type="password"
                readOnly={true} // Always read-only for security?
              />
            </Form>

            {/* Additional Info */}
            <Form className="additional-info-form">
              <h2>Additional Info</h2>
              <TextInput
                value={formData.id}
                onChange={() => {}}
                name="id"
                label="ID"
                readOnly={true} // IDs are not editable
              />
              <TextInput
                value={formData.biography}
                onChange={handleInputChange}
                name="biography"
                label="Biography"
                readOnly={!canEdit}
                multiline
              />
            </Form>
          </div>

          {/* Bottom Line */}
          <div className="divider">
            <div className="r">
              <span>Required *</span>
            </div>
            <div>
              {canEdit && (
                // <div className="divider">
                <div className="buttons">
                  <button onClick={() => setFormData({ ...profileUser })}>Cancel</button>
                  <button onClick={handleSave}>Save</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
