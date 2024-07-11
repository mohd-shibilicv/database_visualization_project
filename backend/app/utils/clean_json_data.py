import json


def clean_swot_json_data(json_data, cleaned_json_data):
    with open(json_data, 'r', encoding="utf-8") as file:
        data = json.load(file)

    def assign_swot(item):
        if 'pestle' in item:
            if item['pestle'] in ['Economic', 'Technological']:
                return 'Opportunities'
            elif item['pestle'] in ['Political', 'Legal']:
                return 'Threats'
        if 'sector' in item:
            if item['sector'] in ['Healthcare', 'Information Technology']:
                return 'Strengths'
            elif item['sector'] in ['Manufacturing', 'Retail']:
                return 'Weaknesses'
        if 'source' in item:
            if item['source'] in ['World Economic Forum', 'OECD']:
                return 'Opportunities'
            elif item['source'] in ['Local News', 'Unknown']:
                return 'Threats'
        
        return 'Opportunities'

    for item in data:
        item['swot'] = assign_swot(item)

    with open(cleaned_json_data, 'w') as file:
        json.dump(data, file, indent=4)
    
    print("JSON Data cleaned succesfully!")


if __name__ == "__main__":
    clean_swot_json_data("jsondata.json", "cleaned_json_data.json")
