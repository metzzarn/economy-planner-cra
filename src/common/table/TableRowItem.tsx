import styles from 'common/table/TableRowItem.module.css';
import React, { CSSProperties, useState } from 'react';
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react';

interface Props {
  value: string;
  allowEdit?: boolean;
  action?: (value: any) => void;
  style?: CSSProperties;
  onClick?: () => any;
}
export const TableRowItem = (props: Props) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <th
      style={props.style}
      className={styles.item}
      onMouseEnter={() => props.allowEdit && setShowEditIcon(true)}
      onMouseLeave={() => props.allowEdit && setShowEditIcon(false)}
      onClick={() => props.onClick && props.onClick()}
    >
      <Editable
        placeholder={props.value}
        // defaultValue={props.value}
        value={isEditing ? undefined : props.value}
        onSubmit={(value) => {
          setIsEditing(false);
          return props.action && props.action(value.value);
        }}
        maxLength={30}
        selectOnFocus={false}
        readOnly={!props.allowEdit}
        onEdit={() => setIsEditing(true)}
      >
        <EditableArea>
          <EditableInput />
          <EditablePreview />
          {!isEditing && showEditIcon && <span>[X]</span>}
        </EditableArea>
      </Editable>
    </th>
  );
};
