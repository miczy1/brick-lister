const RegularList = ({ items = [], resourceName, ItemComponent, ...rest }) => (
    <>
        {items.map((item, index) => (
            <ItemComponent
                key={item.id ?? item.elementId ?? index}
                {...{ [resourceName]: item }}
                {...rest}
            />
        ))}
    </>
);

export default RegularList;

