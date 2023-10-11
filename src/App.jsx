import Login from './Pages/Login'
import Directory from './Pages/Directory'
import Details from './Pages/Details'

export default () => {

    return (
        <div className="App">
          
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/directory" element={<Directory/>} />
            <Route path="/details" element={<Details/>} />
          </Routes>
        </div>
      );
}