import React from 'react'
// ...existing code...
import { useState, useEffect, useContext } from 'react';
import Footer from './Footer';
import GsServerAPI from '@/api/GsServerAPI';
import { UsersContext } from './Context/UserDataContext';
import { UsersProfileContext } from './Context/UserProfileContext';
import UserProfileNav from './UserProfileNav';

const UserProfilePage = () => {
    const [editUserField, setEditUserField] = useState<boolean>(false);
    const [editProfileField, setEditProfileField] = useState< boolean>(false);
    const [loading, setLoading] = useState(false);
    const [userForm, setUserForm] = useState({ firstName: '', lastName: '', email: ''});
    const [profileForm, setProfileForm] = useState({ street: '', city: '', country: '', postalCode: '', phoneNumber: ''});

    const {
        accessToken,
        firstName,
        lastName,
        email,
        password,
        ComfirmPassword,
        setFirstName,
        setLastName,
        setEmail,
        setPassword,
        setComfirmPassword,
    } = useContext(UsersContext);

    const {
        street,
        city,
        country,
        postalCode,
        phoneNumber,
        setStreet,
        setCity,
        setCountry,
        setPostalCode,
        setPhoneNumber
    } = useContext(UsersProfileContext);

/*  useEffect(() => {
        
    }, [firstName, lastName, email]);

    useEffect(() => {
        console.log("User Profile Data Updated: ", {street, city, country, postalCode, phoneNumber});
    }, [street, city, country, postalCode, phoneNumber]);

     */
    useEffect(() => {
        const setFromStorage = (setter: ((v: string) => void) | undefined, key: string, defaultValue = '') => {
            try {
                const val = localStorage.getItem(key);
                if (val !== null) {
                    setter && setter(val);
                    return val;
                }
            } catch (err) {
                // ignore possible errors reading localStorage
            }
            // fallback to context value if provided
            return defaultValue;
        };

        // user fields
        const fn = setFromStorage(setFirstName, 'firstName', firstName || '');
        const ln = setFromStorage(setLastName, 'lastName', lastName || '');
        const em = setFromStorage(setEmail, 'email', email || '');

        // profile fields
        const st = setFromStorage(setStreet, 'street', street || '');
        const ct = setFromStorage(setCity, 'city', city || '');
        const cn = setFromStorage(setCountry, 'country', country || '');
        const pc = setFromStorage(setPostalCode, 'postalCode', postalCode || '');
        const ph = setFromStorage(setPhoneNumber, 'phoneNumber', phoneNumber || '');

        // initialize local form states using what's stored or context
        setUserForm({
            firstName: fn || firstName || '',
            lastName: ln || lastName || '',
            email: em || email || ''
        });
        setProfileForm({
            street: st || street || '',
            city: ct || city || '',
            country: cn || country || '',
            postalCode: pc || postalCode || '',
            phoneNumber: ph || phoneNumber || ''
        });
    // run once on mount - include setters to satisfy linter
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("User Profile Data Updated: ", {street, city, country, postalCode, phoneNumber});
    }, [street, city, country, postalCode, phoneNumber]);

    // Controlled input handlers
    const handleUserChange = (key: keyof typeof userForm, value: string) => {
        setUserForm(prev => ({ ...prev, [key]: value }));
    };

    const handleProfileChange = (key: keyof typeof profileForm, value: string) => {
        setProfileForm(prev => ({ ...prev, [key]: value }));
    };

    // Save user form back to context + localStorage and optionally server
    const saveUserChanges = async () => {
        setLoading(true);
        try {
            // update local context + localStorage
            setFirstName && setFirstName(userForm.firstName);
            setLastName && setLastName(userForm.lastName);
            setEmail && setEmail(userForm.email);
            localStorage.setItem('firstName', userForm.firstName);
            localStorage.setItem('lastName', userForm.lastName);
            localStorage.setItem('email', userForm.email);

            // optional: send to API
            await GsServerAPI.patch('/user', {
                firstName: userForm.firstName,
                lastName: userForm.lastName,
                email: userForm.email
            }, {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true
            });

            setEditUserField(false);
        } catch (err) {
            console.error('Save user failed:', err);
        } finally {
            setLoading(false);
        }
    };

    // Save profile form back to context + localStorage and optionally server
    const saveProfileChanges = async () => {
        setLoading(true);
        try {
            setStreet && setStreet(profileForm.street);
            setCity && setCity(profileForm.city);
            setCountry && setCountry(profileForm.country);
            setPostalCode && setPostalCode(profileForm.postalCode);
            setPhoneNumber && setPhoneNumber(profileForm.phoneNumber);

            localStorage.setItem('street', profileForm.street);
            localStorage.setItem('city', profileForm.city);
            localStorage.setItem('country', profileForm.country);
            localStorage.setItem('postalCode', profileForm.postalCode);
            localStorage.setItem('phoneNumber', profileForm.phoneNumber);

            // optional: send to API
            await GsServerAPI.put('/userProfile', profileForm, {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true
            });

            setEditProfileField(false);
        } catch (err) {
            console.error('Save profile failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const cancelUserEdit = () => {
        // revert to last saved context/localStorage values
        setUserForm({
            firstName: firstName || localStorage.getItem('firstName') || '',
            lastName: lastName || localStorage.getItem('lastName') || '',
            email: email || localStorage.getItem('email') || ''
        });
        setEditUserField(false);
    };

    const cancelProfileEdit = () => {
        setProfileForm({
            street: street || localStorage.getItem('street') || '',
            city: city || localStorage.getItem('city') || '',
            country: country || localStorage.getItem('country') || '',
            postalCode: postalCode || localStorage.getItem('postalCode') || '',
            phoneNumber: phoneNumber || localStorage.getItem('phoneNumber') || ''
        });
        setEditProfileField(false);
    };

    return (
        <>
            <UserProfileNav/>
            <div className='min-h-screen flex flex-col items-center mt-8 mb-8'>
                <div className='w-full max-w-3xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md'>
                    <h1 className='text-2xl font-semibold mb-4'>User Profile</h1>

                    <section className='mb-6'>
                        <h2 className='text-lg font-medium mb-3'>Account Info</h2>
                        <div className='grid grid-cols-1 gap-3'>
                            {/* First Name */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>First name</label>
                                    {editUserField ? (
                                        <input
                                            value={userForm.firstName}
                                            onChange={(e) => handleUserChange('firstName', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={userForm.firstName}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>Last name</label>
                                    {editUserField ? (
                                        <input
                                            value={userForm.lastName}
                                            onChange={(e) => handleUserChange('lastName', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={userForm.lastName}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>Email</label>
                                    {editUserField ? (
                                        <input
                                            value={userForm.email}
                                            onChange={(e) => handleUserChange('email', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={userForm.email}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                editUserField ? (
                                    <div className='flex gap-2 mt-4'>
                                        <button className='btn-save px-4 py-2 bg-green-500 text-white rounded' disabled={loading} onClick={saveUserChanges}>Save Changes</button>
                                        <button className='btn-cancel px-4 py-2 bg-gray-300 text-black rounded' disabled={loading} onClick={cancelUserEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <button className='btn-edit px-4 py-2 bg-blue-500 text-white rounded mt-4' onClick={() => setEditUserField(true)}>Edit Profile</button>
                                )
                            }
                        </div>
                    </section>

                    <section>
                        <h2 className='text-lg font-medium mb-3'>Profile Info</h2>
                        <div className='grid grid-cols-1 gap-3'>
                            {/* Street */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>Street</label>
                                    {editProfileField ? (
                                        <input
                                            value={profileForm.street}
                                            onChange={(e) => handleProfileChange('street', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={profileForm.street}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>

                            {/* City */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>City</label>
                                    {editProfileField ? (
                                        <input
                                            value={profileForm.city}
                                            onChange={(e) => handleProfileChange('city', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={profileForm.city}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Country */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>Country</label>
                                    {editProfileField ? (
                                        <input
                                            value={profileForm.country}
                                            onChange={(e) => handleProfileChange('country', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={profileForm.country}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Postal Code */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>Postal Code</label>
                                    {editProfileField ? (
                                        <input
                                            value={profileForm.postalCode}
                                            onChange={(e) => handleProfileChange('postalCode', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={profileForm.postalCode}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className='flex items-center justify-between gap-3'>
                                <div className='flex-1'>
                                    <label className='text-sm block text-gray-600 dark:text-gray-300'>Phone</label>
                                    {editProfileField ? (
                                        <input
                                            value={profileForm.phoneNumber}
                                            onChange={(e) => handleProfileChange('phoneNumber', e.target.value)}
                                            className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800'
                                        />
                                    ) : (
                                        <input type="text" 
                                        value={profileForm.phoneNumber}
                                        readOnly 
                                        className='mt-1 w-full border rounded px-2 py-1 dark:bg-gray-800 bg-gray-200 cursor-not-allowed'
                                        />
                                    )}
                                </div>
                            </div>

                            <div>
                                {editProfileField ? (
                                        <div className='flex gap-2 mt-4'>
                                            <button className='btn-save px-4 py-2 bg-green-500 text-white rounded' disabled={loading} onClick={saveProfileChanges}>Save Changes</button>
                                            <button className='btn-cancel px-4 py-2 bg-gray-300 text-black rounded' disabled={loading} onClick={cancelProfileEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <button className='btn-edit px-4 py-2 bg-blue-500 text-white rounded mt-4' onClick={() => setEditProfileField(true)}>Edit Profile</button>
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UserProfilePage

// ...existing code...