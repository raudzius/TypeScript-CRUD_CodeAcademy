export type StringifiedObject<T extends Object> = {
    [Key in keyof T]: string
};

const stringifyObjectProps = <T extends Object>(object: T): StringifiedObject<T> => {
    const objectLikeArray = Object.entries(object);

    const objectWithStringifiedProps = objectLikeArray
        .reduce<Partial<StringifiedObject<T>>>((prevObj, [key, value]) => ({
            ...prevObj,
            [key]: String(value),
        }), {});

    return objectWithStringifiedProps as StringifiedObject<T>;
};

export default stringifyObjectProps;
