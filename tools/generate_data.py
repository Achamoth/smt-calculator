import os
import json

class Demon:
    def __init__(self, race, name, level, skills):
        self.race = race
        self.name = name
        self.level = level
        self.skills = skills
        self.resistances = self.emptyResistances()
        self.affinities = self.emptyAffinities()
    
    def emptyResistances(self):
        return [
            {
                "phys": "none",
                "gun" : "none",
                "fire": "none",
                "ice": "none",
                "wind": "none",
                "elec": "none",
                "light": "none",
                "dark": "none"
            }
        ]
    
    def emptyAffinities(self):
        return [
            {
                "phys": 0,
                "gun" : 0,
                "fire": 0,
                "ice": 0,
                "wind": 0,
                "elec": 0,
                "light": 0,
                "dark": 0
            }
        ]

demons = []

for filename in os.listdir('Demon Database'):
    file = open('Demon Database/'+filename)
    lines = file.readlines()[1:]
    race = lines[0].strip()
    for line in lines[1:]:
        line = line.strip()
        tokens = line.split(',')
        name = tokens[0]
        level = int(tokens[1])
        skillList = tokens[2]
        skills = []
        for skill in skillList.split(':'):
            skills.append({"level": 0, "name": skill})
        demon = Demon(race, name, level, skills)
        demons.append(demon)

json_string = '['
for demon in demons:
    json_string += json.dumps(demon.__dict__)
    json_string += ','
json_string = json_string[:-1]
json_string += ']'

file = open('data.json', 'w')
file.write(json_string)
file.close()
