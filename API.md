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
