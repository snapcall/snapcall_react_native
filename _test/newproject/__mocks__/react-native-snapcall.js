

const hangupMock = jest.fn().mockImplementation(() => { return new Promise((resolve, reject) => {
 });
});

function Snapcall() {
   this.hangup = hangupMock;
   this.bidIsClosed = () => { return new Promise((resolve, reject) => {
    });
  }
  this.askForPermission = () => { return new Promise((resolve, reject) => {
   });
 }

  this.addEventListener = function(){};

  this.getCurrentState = () => { return new Promise((resolve, reject) => {
   });
 }
}

function SnapcallParameter() {

}

const MockModuleSnapcall = {
  Snapcall,
  SnapcallParameter,
}

MockModuleSnapcall.mocks = {};
MockModuleSnapcall.mocks.hangup = hangupMock;

module.exports = MockModuleSnapcall
