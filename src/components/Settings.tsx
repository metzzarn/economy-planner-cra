import { useAppDispatch, useAppSelector } from 'hooks';
import { selectDecimalPlaces, setDecimalPlaces } from 'redux/settingsSlice';

export const Settings = () => {
  const dispatch = useAppDispatch();
  const decimalPlaces = useAppSelector(selectDecimalPlaces);

  return (
    <div>
      <h2>Settings</h2>
      {/*<form>*/}
      Decimal places:
      <div>
        <div>
          <input
            type="radio"
            id="decimalPlaces0"
            name="decimalPlaces"
            defaultChecked={decimalPlaces === 0}
            value="0"
            onChange={() => {
              dispatch(setDecimalPlaces(0));
            }}
          />
          <label htmlFor="decimalPlaces0">0</label>
        </div>

        <div>
          <input
            type="radio"
            id="decimalPlaces1"
            name="decimalPlaces"
            defaultChecked={decimalPlaces === 1}
            value="1"
            onChange={() => {
              dispatch(setDecimalPlaces(1));
            }}
          />
          <label htmlFor="decimalPlaces1">1</label>
        </div>

        <div>
          <input
            type="radio"
            id="decimalPlaces2"
            name="decimalPlaces"
            defaultChecked={decimalPlaces === 2}
            value="2"
            onChange={() => {
              dispatch(setDecimalPlaces(2));
            }}
          />
          <label htmlFor="decimalPlaces2">2</label>
        </div>
      </div>
      {/*  <div>*/}
      {/*    <button type="submit">Submit</button>*/}
      {/*  </div>*/}
      {/*</form>*/}
    </div>
  );
};
