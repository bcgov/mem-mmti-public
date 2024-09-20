import { Project } from '@models/project';

export class TestConstants {
  public static readonly testProjects = [
    new Project({
      _schemaName: 'MineBCMI',
       read: ['public', 'sysadmin'],
       write: ['sysadmin'],
       name: 'Gold Tigers, NA',
       permittee: 'Tiger Lord',
       type: 'Gold',
       status: 'Hissing' ,
       region: 'Caribou',
       permitNumber: 'C-123',
       location: { 'type': 'Point', 'coordinates': [-122.76, 53.931] },
       commodities: ['Gold', 'Gold Tigers'],
       summary: 'I like goooooold',
       isMatch: false
   }),
  new Project({
        _schemaName: 'MineBCMI',
       read: ['public', 'sysadmin'],
       write: ['sysadmin'],
       name: 'Silver R Us, NA',
       permittee: 'Long Jonh Silver',
       type: 'Silver',
       status: 'Flourishing' ,
       region: 'Kootenay',
       permitNumber: 'C-456',
       location: { 'type': 'Point', 'coordinates': [-123.5123, 49.2911] },
       commodities: ['Silver', 'Silver Boots'],
       summary: 'Silver or Bust',
       isMatch: false
    })
  ];
}
