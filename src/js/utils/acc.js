const acc = (t) => {
  t = t.replace(/Ά/g, "Α");
  t = t.replace(/ά/g, "α");
  t = t.replace(/Έ/g, "Ε");
  t = t.replace(/έ/g, "ε");
  t = t.replace(/Ή/g, "Η");
  t = t.replace(/ή/g, "η");
  t = t.replace(/Ί/g, "Ι");
  t = t.replace(/Ϊ/g, "Ι");
  t = t.replace(/ί/g, "ι");
  t = t.replace(/ϊ/g, "ι");
  t = t.replace(/ΐ/g, "ι");
  t = t.replace(/Ό/g, "Ο");
  t = t.replace(/ό/g, "ο");
  t = t.replace(/Ύ/g, "Υ");
  t = t.replace(/Ϋ/g, "Υ");
  t = t.replace(/ύ/g, "υ");
  t = t.replace(/ϋ/g, "υ");
  t = t.replace(/ΰ/g, "υ");
  t = t.replace(/Ώ/g, "Ω");
  t = t.replace(/ώ/g, "ω");
  return t;
}
export default acc
