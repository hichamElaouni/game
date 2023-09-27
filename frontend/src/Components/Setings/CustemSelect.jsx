





export default function CustemSelect(props) {

    const { defaultValue, role, onchange, name } = props;

    return (
        <select
            className="selectRole"
            name={name}
            defaultValue={defaultValue === "Admin" ? 1 : defaultValue === "Teacher" ? 2 : 3}
            onChange={(event) => onchange(event)}
        >
            {role != 1 ? (
                ""
            ) : (
                <option value="1">Admin</option>
            )}
            <option value="2">Teacher</option>
            <option value="3">Student</option>
        </select>

    )
}
