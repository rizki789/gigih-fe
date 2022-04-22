import { RiHeadphoneFill } from 'react-icons/ri';
import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { removeAccessToken } from '../../slices/authSlices';

function Header() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  return (
    <header>
      <div className="layout flex justify-between items-center h-full">
        <div>
          <p
            style={{ fontSize: '26pt', display: 'flex', alignItems: 'center' }}
          >
            Denger
            <RiHeadphoneFill />
            Music
          </p>
        </div>
        <div>
          {accessToken ? (
            <button
              type="button"
              className="bg-gray-50 text-slate-800 px-4 py-2 rounded-full"
              onClick={() => {
                dispatch(removeAccessToken());
              }}
            >
              Logout
            </button>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
