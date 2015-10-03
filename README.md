# hz2015

We only accept Swiss numbers:
- removing +41/0041
- only allow 078...



### 1) POST /users/
#### Request
```json
{
  contacts: [],
  id: phone#
}
```

#### Response
##### Code 200
```json
{ id: #}
```

##### Code ~200
```json
{ error: ..., error_msg: "..."}
```

For upcomings request we require that the X-User=# and X-Event HTTP-Headers is set

### 2) GET /events/

#### Request
```json
{ 
  lng: longitude,
  lat: latitude
}
```

#### Response
```json
{
  [{ 
    id: uuid4,
    title: "foobar",
    img_url: "http://...",
    friends: [],
    attending: BOOL
  },{..}]
}
```

### 3) POST /photos/
#### Request -> FILE upload

#### Response
```json
{
  id: uuid,
  img: {
    big: {url: "http://..", height:222, width:333},
    small: {url: "http://..", height:222, width:333},
    blured: {url: "http://..", height:222, width:333},
  }
}
```

### 4) GET /friends/
#### Request
```json
{
}
```

#### Response
```json
{
  [{
    id: #,
    img: {
      big: {url: "http://..", height:222, width:333},
      small: {url: "http://..", height:222, width:333},
      blured: {url: "http://..", height:222, width:333},
    },
    lat: latitude,
    lng: longitude
  },..]
}
```

### 5) PUT /photos/UUID
#### Request 
```json
{
  lng: longitude,
  lat: latitude,
  friends: [#,  ...],
  public: BOOL
}
```

#### Response
```json
{
  lng: longitude,
  lat: latitude,
  friends: [#,  ...],
  public: BOOL
}
```

### PHOTO JSON:
```json
{
  id: UUID,
  img: {
    big: {url: "http://..", height:222, width:333},
    small: {url: "http://..", height:222, width:333},
    blured: {url: "http://..", height:222, width:333},
  },
  public: BOOL,
  lng: longitude,
  lat: latitude,
  user: {
    id: #,
    img: photoJSON
  }
}
```

### 6) GET /photos/
#### Response
```json
{
  [{...}, ]
}
```







