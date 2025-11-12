import { TokenService } from "./getToken";
const tokenService = new TokenService();
async function getToken() {
  return tokenService.getToken();
}
export async function getRooms() {
  return fetch('https://sau-portal.de/ase-1/room-mgmt/rooms', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching lecturers:', error);
    });
}

/*return {
    'rooms': [{
      'id': '01996b8c-8d47-7f28-971b-a308d25b17b5',
      'name': '1.21-1.22',
      'chemSymbol': 'nickel',
      'buildingId': '019968d2-b4a2-75b6-bc38-f63ce59b2da9',
      'characteristics': [{ 'type': 'SEATS', 'value': 50 }, { 'type': 'WHITEBOARD', 'value': true }, {
        'type': 'BEAMER',
        'value': true,
      }],
      'composedOf': [{
        'id': '01996b8b-bf02-7f55-beb8-c1cd28ef96fc',
        'name': '1.22',
        'chemSymbol': 'cobalt',
        'buildingId': '019968d2-b4a2-75b6-bc38-f63ce59b2da9',
        'characteristics': [{ 'type': 'SEATS', 'value': 30 }, { 'type': 'BEAMER', 'value': true }],
        'composedOf': [],
      }, {
        'id': '01996b8a-97ac-700e-9fb8-93a4713b1d00',
        'name': '1.21',
        'chemSymbol': 'ferrum',
        'buildingId': '019968d2-b4a2-75b6-bc38-f63ce59b2da9',
        'characteristics': [{ 'type': 'SEATS', 'value': 25 }, {
          'type': 'WHITEBOARD',
          'value': true,
        }, { 'type': 'BEAMER', 'value': true }],
        'composedOf': [],
      }],
    }, {
      'id': '01996b8b-bf02-7f55-beb8-c1cd28ef96fc',
      'name': '1.22',
      'chemSymbol': 'cobalt',
      'buildingId': '019968d2-b4a2-75b6-bc38-f63ce59b2da9',
      'characteristics': [{ 'type': 'SEATS', 'value': 30 }, { 'type': 'BEAMER', 'value': true }],
      'composedOf': [],
    }, {
      'id': '01996b8a-97ac-700e-9fb8-93a4713b1d00',
      'name': '1.21',
      'chemSymbol': 'ferrum',
      'buildingId': '019968d2-b4a2-75b6-bc38-f63ce59b2da9',
      'characteristics': [{ 'type': 'SEATS', 'value': 25 }, { 'type': 'WHITEBOARD', 'value': true }, {
        'type': 'BEAMER',
        'value': true,
      }],
      'composedOf': [],
    }, {
      'id': '01997f93-69f5-76e4-a902-447c3a157b98',
      'name': '1.24',
      'chemSymbol': 'iron',
      'buildingId': '019968d2-b4a2-75b6-bc38-f63ce59b2da9',
      'characteristics': [{ 'type': 'SEATS', 'value': 11 }, { 'type': 'KAMERA', 'value': true }],
      'composedOf': [],
    }],
  };
}*/
