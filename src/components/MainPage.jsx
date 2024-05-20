import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = ({ Items }) => {
  const [items, setItems] = useState(Items);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newLink, setNewLink] = useState('');
  const navigate = useNavigate();

  const goToCreatePage = () => {
    navigate('/create');
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleDownload = (item) => {
    const blob = new Blob([item], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(items[index].content);
  };

  const handleSave = (index) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, content: editValue } : item
    );
    setItems(newItems);
    setEditingIndex(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      setItems([...items, { type: 'link', content: newLink }]);
      setNewLink('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setItems([...items, { type: 'file', content: file.name, file }]);
    }
  };

  return (
    <div className='page'>
      <div className='navbar'>
        <nav className="navbar bg-body-secondary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Course builder</a>
            <div className="dropdown">
              <a className="btn btn-danger dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                + Add
              </a>
              <ul className="dropdown-menu a ">
                <li><a className="dropdown-item" href="#" onClick={goToCreatePage}>Create module</a></li>
                <li>
                  <a className="dropdown-item" href="#">
                    <input 
                      type="text" 
                      placeholder="Enter link" 
                      value={newLink} 
                      onChange={(e) => setNewLink(e.target.value)} 
                    />
                    <button onClick={handleAddLink}>Add Link</button>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <input 
                      type="file" 
                      onChange={handleFileUpload} 
                    />
                    Upload
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className='dropdownn'>
        {
          items.length === 0 ? (
            <div>No items</div>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li className='lii' key={index}>
                  <div className='input-item'>
                    <div className='items'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4421 12.0581L13.9332 8.56694C14.327 8.17321 14.0481 7.5 13.4913 7.5L6.50907 7.5C5.95225 7.5 5.6734 8.17321 6.06712 8.56694L9.55824 12.0581C9.80232 12.3021 10.198 12.3021 10.4421 12.0581Z" fill="#717171" />
                      </svg>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {editingIndex === index ? (
                          <input 
                            type="text" 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)} 
                          />
                        ) : (
                          <h5>{item.type === 'link' ? <a href={item.content}>{item.content}</a> : item.content}</h5>
                        )}
                        <span>{item.type === 'link' ? 'Link' : item.type === 'file' ? 'Uploaded file' : 'Module'}</span>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.75 13.75C18.75 14.4404 19.3096 15 20 15C20.6904 15 21.25 14.4404 21.25 13.75C21.25 13.0596 20.6904 12.5 20 12.5C19.3096 12.5 18.75 13.0596 18.75 13.75Z" fill="#717171" />
                          <path d="M18.75 26.25C18.75 26.9404 19.3096 27.5 20 27.5C20.6904 27.5 21.25 26.9404 21.25 26.25C21.25 25.5597 20.6904 25 20 25C19.3096 25 18.75 25.5597 18.75 26.25Z" fill="#717171" />
                          <path d="M20 21.25C19.3096 21.25 18.75 20.6904 18.75 20C18.75 19.3096 19.3096 18.75 20 18.75C20.6904 18.75 21.25 19.3096 21.25 20C21.25 20.6904 20.6904 21.25 20 21.25Z" fill="#717171" />
                        </svg>
                      </button>
                      <ul className="dropdown-menu">
                        {editingIndex === index ? (
                          <>
                            <li>
                              <button 
                                className="dropdown-item" 
                                type="button" 
                                onClick={() => handleSave(index)}
                              >
                                Save
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item" 
                                type="button" 
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button 
                                className="dropdown-item" 
                                type="button" 
                                onClick={() => handleEdit(index)}
                              >
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M0.5 10.5466C0.5 10.414 0.552678 10.2868 0.646446 10.193L9.23223 1.60723C10.2085 0.630921 11.7915 0.630924 12.7678 1.60723L12.9393 1.77881C13.9156 2.75512 13.9157 4.33803 12.9393 5.31434L4.35355 13.9001C4.25978 13.9939 4.13261 14.0466 4 14.0466H1C0.867392 14.0466 0.740215 13.9939 0.646447 13.9001C0.552679 13.8064 0.5 13.6792 0.5 13.5466V10.5466ZM1.5 10.7537L1.5 13.0466H3.79289L10.7929 6.04655L8.50002 3.75366L1.5 10.7537ZM9.20713 3.04655L11.5 5.33945L12.2322 4.60723C12.818 4.02145 12.818 3.0717 12.2322 2.48591L12.0607 2.31434C11.4749 1.72855 10.5251 1.72855 9.93934 2.31434L9.20713 3.04655Z" fill="#717171" />
                                  <path d="M7 13.5466C7 13.2704 7.22386 13.0466 7.5 13.0466H12.5C12.7761 13.0466 13 13.2704 13 13.5466C13 13.8227 12.7761 14.0466 12.5 14.0466H7.5C7.22386 14.0466 7 13.8227 7 13.5466Z" fill="#717171" />
                                </svg>
                                Edit
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item" 
                                type="button" 
                                onClick={() => handleDelete(index)}
                              >
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.5 1.04688C4.5 0.77074 4.72386 0.546875 5 0.546875H9C9.27614 0.546875 9.5 0.77074 9.5 1.04688V2.04688H12.5C12.7761 2.04688 13 2.27074 13 2.54688C13 2.82301 12.7761 3.04688 12.5 3.04688H1.5C1.22386 3.04688 1 2.82301 1 2.54688C1 2.27074 1.22386 2.04688 1.5 2.04688H4.5V1.04688Z" fill="#717171" />
                                  <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.04688C2.77614 4.04688 3 4.27074 3 4.54688V11.5469C3 12.3733 3.673 13.0469 4.5 13.0469H9.5C10.327 13.0469 11 12.3733 11 11.5469V4.54688C11 4.27074 11.2239 4.04688 11.5 4.04688C11.7761 4.04688 12 4.27074 12 4.54688V11.5469C12 12.9756 10.9283 14.0469 9.5 14.0469H4.5C3.07171 14.0469 2 12.9756 2 11.5469V4.54688C2 4.27074 2.22386 4.04688 2.5 4.04688Z" fill="#717171" />
                                  <path d="M7 0.046875C7.27614 0.046875 7.5 0.270733 7.5 0.546875V9.33977L10.6464 6.19332C10.8417 5.99806 11.1583 5.99806 11.3536 6.19332C11.5488 6.38858 11.5488 6.70517 11.3536 6.90043L7.35355 10.9004C7.3516 10.9024 7.34964 10.9043 7.34766 10.9062C7.34562 10.9082 7.34356 10.9102 7.34149 10.9121C7.25394 10.994 7.13691 11.0448 7.00805 11.0468C7.00537 11.0469 7.00269 11.0469 7 11.0469C6.99733 11.0469 6.99465 11.0469 6.99195 11.0468C6.86309 11.0448 6.74606 10.994 6.65851 10.9121C6.65644 10.9102 6.65438 10.9082 6.65234 10.9062C6.65036 10.9043 6.6484 10.9024 6.64645 10.9004L2.64645 6.90043C2.45118 6.70517 2.45118 6.38858 2.64645 6.19332C2.84171 5.99806 3.15829 5.99806 3.35355 6.19332L6.5 9.33977V0.546875C6.5 0.270733 6.72386 0.046875 7 0.046875Z" fill="#717171" />
                                  <path d="M7 13.0469C7.27614 13.0469 7.5 13.2707 7.5 13.5469C7.5 13.823 7.27614 14.0469 7 14.0469H1C0.723858 14.0469 0.5 13.823 0.5 13.5469C0.5 13.2707 0.723858 13.0469 1 13.0469H7Z" fill="#717171" />
                                </svg>
                                Delete
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item" 
                                type="button" 
                                onClick={() => handleDownload(item.content)}
                              >
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M0.5 10.5466C0.5 10.414 0.552678 10.2868 0.646446 10.193L9.23223 1.60723C10.2085 0.630921 11.7915 0.630924 12.7678 1.60723L12.9393 1.77881C13.9156 2.75512 13.9157 4.33803 12.9393 5.31434L4.35355 13.9001C4.25978 13.9939 4.13261 14.0466 4 14.0466H1C0.867392 14.0466 0.740215 13.9939 0.646447 13.9001C0.552679 13.8064 0.5 13.6792 0.5 13.5466V10.5466ZM1.5 10.7537L1.5 13.0466H3.79289L10.7929 6.04655L8.50002 3.75366L1.5 10.7537ZM9.20713 3.04655L11.5 5.33945L12.2322 4.60723C12.818 4.02145 12.818 3.0717 12.2322 2.48591L12.0607 2.31434C11.4749 1.72855 10.5251 1.72855 9.93934 2.31434L9.20713 3.04655Z" fill="#717171" />
                                  <path d="M7 13.5466C7 13.2704 7.22386 13.0466 7.5 13.0466H12.5C12.7761 13.0466 13 13.2704 13 13.5466C13 13.8227 12.7761 14.0466 12.5 14.0466H7.5C7.22386 14.0466 7 13.8227 7 13.5466Z" fill="#717171" />
                                </svg>
                                Download
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
};

export default MainPage;
