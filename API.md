# El-7a2ni clinic API References

#### Signin

```http
  POST /signin
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `string` | **Required** |
| `Password` | `string` | **Required** |

#### change password

```http
  put /changePassword
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `email`   | `string` | **Required** |

#### create Patient

```http
  POST /addPatient
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `string` | **Required** |
| `Password` | `string` | **Required** |
| `email`    | `string` | **Required** |
| `DOB`      | `Date`   | **Required** |

#### uplaod file patient

```http
  POST /patientUploadFile
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `string` | **Required** |

#### download file Patient

```http
  GET /viewFiles/:filename
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `filename` | `string` | **Required** |

#### download file Patient

```http
  GET /viewFilesDoctor/:filename
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `filename` | `string` | **Required** |

#### patient wallet

```http
  GET /getWallet/:username
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |

#### doctor wallet

```http
  GET /getWalletD/:username
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |

#### patient upload medical history

```http
  GET /patientUploadHealthRecord
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `string` | **Required** |

#### get patient medical history

```http
  GET /gethealthrecords/:Username
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `string` | **Required** |

#### get patients

```http
  GET /getPatient
```

#### get patients filtered

```http
  GET /filterPatient
```

#### update patient

```http
  PUT /updatePatient
```

#### delete patient

```http
  DELETE /deletePatient
```

#### delete file

```http
  PUT /deleteFile
```

#### Reset Password

```http
  PUT /ResetPass
```

#### create doctor

```http
  POST /addDoctor
```

#### get all doctors

```http
  GET /getDoctor
```

#### update doctor

```http
  PUT /updateDoctor
```

#### add new Patient for doctor

```http
  PUT /addPatient4Doctor
```

#### delete doctor

```http
  DELETE /deleteDoctor
```

#### find doctor

```http
  GET /findDoctor
```

#### upload file for doctor

```http
  POST /doctorUploadFile
```

#### get patient names for doctor

```http
  GET /PatientsName/:Username
```

#### update status

```http
  PUT /updateStatus
```

#### create new admin

```http
  POST /addAdmin
```

#### get all admins

```http
  GET /getAdmin
```

#### update an admin

```http
  PUT /updateAdmin
```

#### delete an admin

```http
  DELETE /deleteAdmin
```

#### create a package

```http
  POST /createPackage
```

#### get a package

```http
  GET /getPackage
```

#### update a package

```http
  PUT /updatePackage
```

#### delete a package

```http
  DELETE /deletePackage
```

#### create a relation

```http
  POST /createRelation
```

#### get a relation of a user

```http
  GET /getRelation
```

#### update a relation

```http
  PUT /updateRelation
```

#### delete a relation

```http
  DELETE /deleteRelation
```

#### create Prescription

```http
  POST /createPrescriptions
```

#### get Prescriptions

```http
  GET /getPrescriptions
```

#### update Prescriptions

```http
  PUT /updatePrescriptions
```

#### delete Prescriptions

```http
  DELETE /deletePrescriptions
```

#### remove medicine

```http
  PUT /removemedicine
```

#### create an appointment

```http
  POST /createAppointment
```

#### create a Follow Up appointment

```http
  POST /createFollowUp
```

#### get appointments

```http
  GET /getAppointment
```

#### get appointment filter

```http
  GET /getAppointmentFilter
```

#### filter by date for appointments

```http
  GET /filterDateAppointments
```

#### filter by status for appointments

```http
  GET /filterStatusAppointments
```

#### update an appointment

```http
  PUT /updateAppointment
```

#### add refund to wallet

```http
  PUT /updateAppointmentWallet
```

#### reschedule an appointment

```http
  PUT /rescheduleAppointment
```

#### cancel an appointment

```http
  PUT /cancelAppointment
```

#### delete an appointment

```http
  DELETE /deleteAppointment
```

#### create an account that is already linked

```http
  POST /createLinkedAccount
```

#### get linked accounts

```http
  GET /getLinkedAccounts
```

#### create a health package

```http
  POST /createHealthPackage
```

#### get a health packages

```http
  GET /getHealthPackages
```

#### view status for Myself

```http
  GET /viewStatusforMyself
```

#### view status for my family member

```http
  GET /viewStatusForMyFamilyMember
```

#### Cancel subscription

```http
  PUT /Cancelsubscription
```

#### get a discount

```http
  GET /getDiscount
```

#### get discount on session

```http
  GET /getDiscountSession
```

#### pay for package with wallet

```http
  PUT /PaymentPackageWallet
```

#### create a notification

```http
  POST /createNotification
```

#### get notifications

```http
  GET /getNotification
```

#### delete a notification

```http
  DELETE /deleteNotification
```

#### create a medicine

```http
  POST /addMedicine
```

#### get medicines

```http
  GET /getMedicine
```

#### update a medicine

```http
  PUT /updateMedicine
```

#### archive a medicine

```http
  PUT /archiveMedicine
```

#### unarchive a medicine

```http
  PUT /unarchiveMedicine
```

#### update quantity

```http
  PUT /updateQuantity
```

#### reverse quantity

```http
  PUT /reverseQuantity
```

#### Create request

```http
  POST /createFURP
```

#### delete all requests

```http
  DELETE /deleteAllRequests
```

#### get all request

```http
  GET /getAllRequests
```

#### get my requests

```http
  GET /getMyRequests
```

#### handle reject

```http
  DELETE /deleteRequest
```

#### handle accept

```http
  PUT /acceptRequest
```
